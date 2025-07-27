import {env} from "@/lib/env";

export interface Play {
    id: number;
    name: string;
    cover_urls: string[];
    audio_urls: string[];
}

export async function fetchTracks(query: string, cursor: number | null, limit: number = 20): Promise<{ plays: Play[]; cursor: number | null; }> {
    const params = new URLSearchParams();
    params.append("search_text", query);
    if (cursor)
        params.append("after_id", cursor.toString());
    if (limit)
        params.append("limit", limit.toString());

    const res = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}tracks?${params.toString()}`);
    if (!res.ok) throw new Error("Ошибка загрузки");

    return res.json();
}