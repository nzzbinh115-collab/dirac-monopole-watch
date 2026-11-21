"use client";
import { ArticleCard } from "./article-card";
import { SiteShell } from "./site-shell";
import { useLanguage } from "./language-provider";
import type { Paper } from "@/lib/types";
export function SectionPage({ papers, section }: { papers: Paper[]; section: "theory" | "math" | "experiments" }) {
  const { lang } = useLanguage();
  const copy = section === "experiments" ? { vi: ["Thực nghiệm", "Theo dõi các phép tìm kiếm có đối tượng là hạt mang từ tích. Các giới hạn chỉ được so sánh trong chính giả định của từng phân tích."], en: ["Experiments", "Follow searches for particles carrying magnetic charge. Limits are compared only within each analysis’s assumptions."] } : section === "math" ? { vi: ["Vật lý toán", "Các cấu trúc hình học chỉ xuất hiện khi liên hệ với monopole Dirac có thể giải thích rõ ràng."], en: ["Mathematical physics", "Geometric structures appear here only when their connection to the Dirac monopole can be stated clearly."] } : { vi: ["Lý thuyết", "Dây Dirac, lượng tử hóa từ tích và mô tả trường lượng tử được tách khỏi bằng chứng thực nghiệm."], en: ["Theory", "Dirac strings, magnetic-charge quantization and quantum-field descriptions are separated from experimental evidence."] };
  return <SiteShell><section className="mx-auto max-w-5xl px-5 pt-16"><p className="text-sm font-semibold text-[#c06f2f]">{section === "experiments" ? "Search record" : "Research map"}</p><h1 className="mt-3 font-serif text-5xl text-[#07131d]">{copy[lang][0]}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-[#355362]">{copy[lang][1]}</p><div className="mt-14">{papers.length ? papers.map(p => <ArticleCard key={p.id} paper={p} />) : <p className="border-t border-[#b9c7c5] py-8 text-[#52707b]">{lang === "vi" ? "Chưa có mục đã duyệt." : "No reviewed entries yet."}</p>}</div></section></SiteShell>;
}
