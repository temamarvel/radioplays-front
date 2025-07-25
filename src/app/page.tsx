'use client'

import {useEffect, useState, useRef} from 'react'
import {useInView} from "react-intersection-observer"
import {AudioCard} from "@/components/AudioCard"
import {Play, fetchTracks} from "@/lib/api";

export default function Home() {
    const [query, setQuery] = useState('')
    const [tracks, setTracks] = useState<Play[]>([]);
    // todo think about default value for cursor
    const [cursor, setCursor] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    async function search() {
        setLoading(true);
        try {
            const data = await fetchTracks(query);
            setTracks(data.plays);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            await search();
        })();
    }, []);

    return (
        <main className="min-h-screen px-4 py-8 bg-zinc-950 text-white">
            {/* Название сайта */}
            <h1 className="text-4xl font-bold mb-6 text-center">Retrofon</h1>

            {/* Поисковая строка */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Поиск аудиозаписей..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && search()}
                    className="w-full max-w-xl px-4 py-2 rounded-xl bg-zinc-800 text-white placeholder-gray-400"
                />
            </div>

            {/* Сетка карточек */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Тут позже будут карточки */}

                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {tracks.map((track) => (
                            <AudioCard key={track.id} title={track.name} thumbnails={track.cover_urls} />
                        ))}
                    </div>
                )}


                {/*{dummyData.map((item, index) => (*/}
                {/*    <AudioCard key={index} title={item.title} thumbnails={item.thumbnails}/>*/}
                {/*))}*/}

            </div>
        </main>
    )
}