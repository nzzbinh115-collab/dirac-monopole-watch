import { papers } from "@/data/papers"; import { SectionPage } from "@/components/section-page";
export default function TheoryPage() { return <SectionPage section="theory" papers={papers.filter(p => p.areas.includes("THEORY"))} />; }
