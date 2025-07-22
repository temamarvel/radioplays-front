export interface AudioTrack {
    id: number;
    name: string;
    cover_urls: string[];
    audio_urls: string[];
}

export async function fetchTracks(query: string): Promise<AudioTrack[]> {
    debugger;
    const res = await fetch(`http://127.0.0.1:8000/audio?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Ошибка при загрузке аудиозаписей");
    return res.json();
}