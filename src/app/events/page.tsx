"use client";

import { events } from "@/data/events";
import { SiteShell } from "@/components/site-shell";
import { useLanguage } from "@/components/language-provider";

export default function EventsPage() {
  const { lang } = useLanguage();
  const formatter = new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-GB", { dateStyle: "long", timeZone: "UTC" });
  return <SiteShell><section className="mx-auto max-w-5xl px-5 pt-16"><h1 className="font-serif text-5xl">{lang === "vi" ? "Sự kiện đặc biệt" : "Exceptional updates"}</h1><p className="mt-5 max-w-2xl leading-7 text-[#355362]">{lang === "vi" ? "BREAKING là ứng viên từ nguồn được theo dõi; VERIFIED chỉ có nghĩa là thông tin biên tập đã kiểm nguồn chính thức. Cả hai không thay thế mức bằng chứng khoa học." : "BREAKING is a candidate from a monitored source; VERIFIED only means the editorial item has been checked against an official source. Neither replaces scientific evidence level."}</p>{events.map(event => <article key={event.id} className="mt-10 border-t border-[#b9c7c5] py-6"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${event.status === "VERIFIED" ? "bg-[#bfe9e4] text-[#123f49]" : "bg-[#f2dfbf] text-[#7d4e1d]"}`}>{event.status}</span><h2 className="mt-4 font-serif text-3xl">{event.title}</h2><p className="mt-2 text-sm text-[#52707b]">{formatter.format(new Date(`${event.date}T00:00:00Z`))} · {event.sourceName}</p><p className="mt-4 leading-7 text-[#294957]">{event.summary[lang]}</p><p className="mt-3 border-l-2 border-[#c88642] pl-3 text-sm leading-6 text-[#355362]">{event.note[lang]}</p><a href={event.sourceUrl} className="mt-4 inline-block text-sm font-semibold text-[#ad5b20] hover:underline" target="_blank" rel="noreferrer">{lang === "vi" ? "Mở nguồn" : "Open source"}</a></article>)}</section></SiteShell>;
}
