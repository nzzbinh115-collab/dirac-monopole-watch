"""Minimal arXiv collector for Dirac Monopole Watch.

Uses only Python's standard library. It retrieves recent submissions from the
configured categories, retains a two-week overlap, deduplicates by arXiv ID,
and never advances the success timestamp when a request or parse fails.
"""
from __future__ import annotations

import json
import ssl
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import UTC, datetime, timedelta
from pathlib import Path

try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except Exception:
    try:
        SSL_CONTEXT = ssl.create_default_context()
    except Exception:
        SSL_CONTEXT = None

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "config" / "settings.json").read_text(encoding="utf-8"))
STATE_PATH = ROOT / "data" / "collector-state.json"
OUT = ROOT / "data" / "papers" / "arxiv-records.json"
ATOM = "http://www.w3.org/2005/Atom"
ARXIV = "http://arxiv.org/schemas/atom"

def read_json(path: Path, default):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else default

def as_date(text: str) -> datetime:
    return datetime.fromisoformat(text.replace("Z", "+00:00"))

def request_feed(category: str, start: int) -> bytes:
    query = urllib.parse.urlencode({"search_query": f"cat:{category}", "sortBy": "submittedDate", "sortOrder": "descending", "start": start, "max_results": CONFIG["page_size"]})
    url = f"https://export.arxiv.org/api/query?{query}"
    request = urllib.request.Request(url, headers={"User-Agent": "DiracMonopoleWatch/0.1 (personal research tracker)"})
    with urllib.request.urlopen(request, timeout=45, context=SSL_CONTEXT) as response:
        return response.read()

def text(entry: ET.Element, tag: str, ns: str = ATOM) -> str:
    return " ".join((entry.findtext(f"{{{ns}}}{tag}") or "").split())

def record(entry: ET.Element, category: str) -> dict:
    raw_id = text(entry, "id").rsplit("/", 1)[-1]
    arxiv_id = raw_id.split("v")[0]
    links = {node.attrib.get("title", ""): node.attrib.get("href", "") for node in entry.findall(f"{{{ATOM}}}link")}
    return {
        "arxiv_id": arxiv_id, "arxiv_version": raw_id, "title": text(entry, "title"), "authors": [text(author, "name") for author in entry.findall(f"{{{ATOM}}}author")], "abstract": text(entry, "summary"),
        "primary_category": (entry.find(f"{{{ARXIV}}}primary_category").attrib.get("term", category) if entry.find(f"{{{ARXIV}}}primary_category") is not None else category), "categories": [node.attrib.get("term") for node in entry.findall(f"{{{ATOM}}}category")],
        "initial_submission_date": text(entry, "published"), "latest_version_date": text(entry, "updated"), "doi": (text(entry, "doi", ARXIV) or text(entry, "doi", ATOM)) or None, "journal_reference": (text(entry, "journal_ref", ARXIV) or text(entry, "journal_ref", ATOM)) or None,
        "abstract_url": f"https://arxiv.org/abs/{raw_id}", "pdf_url": links.get("pdf", f"https://arxiv.org/pdf/{raw_id}"), "collected_at": datetime.now(UTC).isoformat(),
        "relevance": "PENDING_REVIEW", "document_type": "RESEARCH", "editorial_verification": "PENDING_REVIEW", "classification_confidence": "LOW", "ai_summary": None,
    }

def main() -> None:
    state = read_json(STATE_PATH, {"last_successful_scan": None})
    last = as_date(state["last_successful_scan"]) if state.get("last_successful_scan") else datetime.now(UTC) - timedelta(days=CONFIG["overlap_days"])
    cutoff = last - timedelta(days=CONFIG["overlap_days"])
    existing = {item["arxiv_id"]: item for item in read_json(OUT, [])}
    new_records = 0
    for category in CONFIG["arxiv_categories"]:
        start = 0
        while True:
            root = ET.fromstring(request_feed(category, start))
            entries = root.findall(f"{{{ATOM}}}entry")
            if not entries: break
            oldest = None
            for entry in entries:
                item = record(entry, category); submitted = as_date(item["initial_submission_date"]); oldest = submitted if oldest is None or submitted < oldest else oldest
                if submitted >= cutoff:
                    if item["arxiv_id"] not in existing:
                        new_records += 1
                    existing[item["arxiv_id"]] = {**existing.get(item["arxiv_id"], {}), **item}
            if oldest is None or oldest < cutoff: break
            start += len(entries); time.sleep(CONFIG["request_delay_seconds"])
    OUT.write_text(json.dumps(sorted(existing.values(), key=lambda item: item["latest_version_date"], reverse=True), ensure_ascii=False, indent=2), encoding="utf-8")
    STATE_PATH.write_text(json.dumps({
        "last_successful_scan": datetime.now(UTC).isoformat(),
        "new_records_in_last_scan": new_records,
    }, indent=2), encoding="utf-8")

if __name__ == "__main__": main()
