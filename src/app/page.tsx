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

    const dummyData = [
        {
            title: "Сказка про Репку",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        },
        {
            title: "Золотой Петушок",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        },
        {
            title: "Конёк-Горбунок",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        },
        {
            title: "Конёк-Горбунок",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        },
        {
            title: "Конёк-Горбунок",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        },
        {
            title: "Конёк-Горбунок",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        },
        {
            title: "Конёк-Горбунок",
            thumbnails: [ ],
        },
        {
            title: "Конёк-Горбунок",
            thumbnails: [ ],
        },
        {
            title: "Конёк-Горбунок",
            thumbnails: [ ],
        },{
            title: "Конёк-Горбунок",
            thumbnails: [ ],
        },

        {
            title: "Конёк-Горбунок",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        },
        {
            title: "Конёк-Горбунок",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        }, {
            title: "Конёк-Горбунок",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        },
        {
            title: "Конёк-Горбунок",
            thumbnails: [
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
                "/test_thumb.webp",
            ],
        },
    ]


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
            <div className="justify-center grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {/* Тут позже будут карточки */}

                {loading ? (
                    <p>Загрузка...</p>
                ) : (

                    // tracks.map((track) => (
                    //     <AudioCard key={track.id} title={track.name} thumbnails={track.cover_urls} />
                    // ))

                    dummyData.map((item, index) => (
                        <AudioCard key={index} title={item.title} thumbnails={item.thumbnails}/>
                    ))

                )}


                {/*{dummyData.map((item, index) => (*/}
                {/*    <AudioCard key={index} title={item.title} thumbnails={item.thumbnails}/>*/}
                {/*))}*/}

            </div>
        </main>
    )
}