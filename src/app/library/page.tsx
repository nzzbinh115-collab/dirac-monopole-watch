import { papers } from "@/data/papers"; import { LibraryClient } from "@/components/library-client";
export default function LibraryPage() { return <LibraryClient papers={papers} />; }
