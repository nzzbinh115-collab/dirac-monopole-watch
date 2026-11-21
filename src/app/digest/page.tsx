"use client";
import { digests } from "@/data/digests";
import { SiteShell } from "@/components/site-shell";
import { useLanguage } from "@/components/language-provider";

export default function DigestPage() {
  const { lang } = useLanguage();
  return <SiteShell><section className="mx-auto max-w-5xl px-5 pt-16 pb-20">
    <p className="text-sm font-semibold text-[#c06f2f]">Archive</p>
    <h1 className="mt-3 font-serif text-5xl">{lang === "vi" ? "Tổng hợp tháng" : "Monthly digests"}</h1>
    {digests.map(d => <article key={d.id} className="mt-10 rounded-2xl border border-[#b9c7c5] bg-[#e7ede7] p-7">
      <p className="text-sm font-semibold text-[#ad5b20]">{lang === "vi" ? `Số ${d.issue}` : `Issue ${d.issue}`} · {lang === "vi" ? d.periodVi : d.periodEn}</p>
      <h2 className="mt-2 font-serif text-3xl">{d.title[lang]}</h2>
      <p className="mt-3 text-sm text-[#355362]">{lang === "vi"
        ? `Đã quét ${d.stats.scanned} bản ghi · ${d.stats.direct} DIRECT · ${d.stats.related} RELATED · ${d.stats.excluded} EXCLUDED · ${d.stats.pending} chưa rõ`
        : `Scanned ${d.stats.scanned} records · ${d.stats.direct} DIRECT · ${d.stats.related} RELATED · ${d.stats.excluded} EXCLUDED · ${d.stats.pending} pending`}</p>
      {d.sections.map(s => <div key={s.heading.en} className="mt-6">
        <h3 className="font-serif text-xl text-[#07131d]">{s.heading[lang]}</h3>
        <p className="mt-2 max-w-3xl leading-7 text-[#355362]">{s.body[lang]}</p>
      </div>)}
      <a className="mt-6 inline-block text-sm font-semibold text-[#ad5b20] hover:underline" href={d.markdownPath} download>Download Markdown</a>
    </article>)}
  </section></SiteShell>;
}
