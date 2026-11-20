# Dirac Monopole Watch

Private, bilingual research observatory for the **Dirac magnetic monopole**.

## What is working in this initial release

- Vietnamese–English client-side language switcher.
- Newsroom, experiments, theory, mathematical physics, library, events and digest pages.
- Source-linked sample records with separate `relevance`, `document_type`, evidence level and editorial verification.
- Client-side library search and category/relevance filters.
- Standard-library Python collector foundation for `hep-th`, `hep-ex` and `math-ph`.
- Weekly GitHub Actions workflow at 09:17 Asia/Ho_Chi_Minh (02:17 UTC).

`VERIFIED` is **editorial verification only**: the source and editorial description were checked. It never means that a scientific result is a confirmed discovery. Scientific state is recorded separately as `THEORY`, `SIMULATION`, `LIMIT`, `CANDIDATE`, or `DETECTION`.

## Local development

```powershell
npm run dev
```

Open `http://localhost:3000`. For a production static build:

```powershell
npm run build
```

The project sets Next.js static export mode; output is written to `out/` when the build completes.

## Collector

The collector is deliberately conservative:

- Requests each configured arXiv category, with pagination and a 14-day overlap.
- Deduplicates with the unversioned arXiv ID while preserving the latest version identifier.
- Preserves first submission and latest version dates.
- Writes all new records as `PENDING_REVIEW` with `ai_summary: null`.
- Does not advance `data/collector-state.json` after an exception.

Run it in an environment with Python 3.12 or newer:

```powershell
python collector/arxiv_collector.py
```

It uses no AI key and does not classify or summarize automatically. Edit `config/settings.json` and `config/keywords.json` to change schedules, categories, overlap and vocabulary.

## Cloudflare Pages + Cloudflare Access

1. Put this directory in a **private GitHub repository** and push it.
2. In Cloudflare Pages, create a project from that repository. Use build command `npm run build` and output directory `out`.
3. In Cloudflare Zero Trust, create an **Access application** for the Pages hostname. Set the application domain to the full deployed hostname, for example `watch.example.com/*`.
4. Add an Allow policy limited to your email address or your chosen identity-provider group. Do not create a broad “Everyone” policy.
5. Apply the Access application to the full hostname, including `/*`; this protects site pages and static JSON/Markdown assets on the same host.
6. Keep repository, Cloudflare and GitHub credentials outside browser code. GitHub Actions needs only repository write access for the collector data commit.

Cloudflare Access protects the deployed website. It does not replace private-repository permissions, and GitHub Actions should never store API keys in committed config files.

## Next increments

- Map collector JSON records into the typed website library after editorial review.
- Add source-specific event feed adapters and manual approval of `BREAKING` events.
- Add an explicit model provider only after a real review workflow is established.
- Generate and archive monthly Markdown/PDF digests.
