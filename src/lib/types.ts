export type Relevance = "DIRECT" | "RELATED" | "EXCLUDED" | "PENDING_REVIEW";
export type DocumentType = "RESEARCH" | "REVIEW" | "THESIS" | "NEWS" | "OTHER";
export type EvidenceLevel = "THEORY" | "SIMULATION" | "LIMIT" | "CANDIDATE" | "DETECTION";
export type EditorialVerification = "VERIFIED" | "PENDING_REVIEW";
export type Area = "THEORY" | "EXPERIMENT" | "MATHEMATICAL_PHYSICS";

export type Paper = { id: string; title: string; authors: string[]; abstract: string; primaryCategory: "hep-th" | "hep-ex" | "math-ph"; areas: Area[]; relevance: Relevance; documentType: DocumentType; evidenceLevel: EvidenceLevel; editorialVerification: EditorialVerification; classificationConfidence: "HIGH" | "MEDIUM" | "LOW"; submittedAt: string; updatedAt: string; doi?: string; journalReference?: string; sourceUrl: string; pdfUrl?: string; summary: { vi: string; en: string }; whyItMatters: { vi: string; en: string }; limitations: { vi: string; en: string }; summaryBasis: "ABSTRACT" | "FULL_TEXT" | "OFFICIAL_ANNOUNCEMENT"; };
export type Event = { id: string; title: string; date: string; status: "BREAKING" | "VERIFIED"; sourceUrl: string; sourceName: string; summary: { vi: string; en: string }; note: { vi: string; en: string } };
