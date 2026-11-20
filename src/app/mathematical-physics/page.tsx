import { papers } from "@/data/papers"; import { SectionPage } from "@/components/section-page";
export default function MathematicalPhysicsPage() { return <SectionPage section="math" papers={papers.filter(p => p.areas.includes("MATHEMATICAL_PHYSICS"))} />; }
