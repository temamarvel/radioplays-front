export interface Play {
    id: number;
    name: string;
    cover_urls: string[];
    audio_urls: string[];
}

export async function fetchTracks(query: string, cursor?: number, limit?: number): Promise<{ plays: Play[]; cursor: string | null; }> {
    const params = new URLSearchParams();
    params.append("search_text", query);
    if (cursor)
        params.append("after_id", cursor.toString());
    if (limit)
        params.append("after_id", limit.toString());

    const res = await fetch(`http://127.0.0.1:8000/tracks?${params.toString()}`);
    if (!res.ok) throw new Error("Ошибка загрузки");

    return res.json();
}