import { notFound } from "next/navigation";
import { papers } from "@/data/papers";
import { PaperDetail } from "@/components/paper-detail";

export function generateStaticParams() { return papers.map(paper => ({ id: paper.id })); }

export default async function PaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const paper = papers.find(item => item.id === id);
  if (!paper) notFound();
  return <PaperDetail paper={paper} />;
}
