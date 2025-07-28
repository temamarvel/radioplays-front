'use client'

import {useEffect, useState, useRef} from 'react'
import {useInView} from "react-intersection-observer"
import {AudioCard} from "@/components/AudioCard"
import {Play, fetchTracks} from "@/lib/api";

export default function Home() {
    const [query, setQuery] = useState('')
    const [tracks, setTracks] = useState<Play[]>([]);
    // todo think about default value for cursor
    const [cursor, setCursor] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // const dummyData = [
    //     {
    //         title: "Сказка про Репку",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     },
    //     {
    //         title: "Золотой Петушок",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     },
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     },
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     },
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     },
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     },
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [ ],
    //     },
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [ ],
    //     },
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [ ],
    //     },{
    //         title: "Конёк-Горбунок",
    //         thumbnails: [ ],
    //     },
    //
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     },
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     }, {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     },
    //     {
    //         title: "Конёк-Горбунок",
    //         thumbnails: [
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //             "/test_thumb.webp",
    //         ],
    //     },
    // ]


    async function loadMore() {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await fetchTracks(query, cursor);
            setTracks((prev) => [...prev, ...response.plays]);
            setCursor(response.cursor);
            setHasMore(!!response.cursor); // если null — больше нет
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const { ref, inView } = useInView({
        threshold: 0.5, // вызывается когда 50% sentinel в зоне видимости
        triggerOnce: false,
    });
    
    const didLoad = useRef(false);

    useEffect(() => {
        if (didLoad.current) return;
        didLoad.current = true;

        setTracks([]);
        setCursor(null);
        setHasMore(true);
        (async () => {
            await loadMore();
        })()
    }, []);

    useEffect(() => {
        if (inView) {
            (async () => {
                await loadMore();
            })()
        }
    }, [inView]);

    return (
        <main className="min-h-screen px-4 py-8 bg-zinc-950 text-white">
            <h1 className="text-4xl font-bold mb-6 text-center">Retrofon</h1>

            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Поиск аудиозаписей..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && loadMore()}
                    className="w-full max-w-xl px-4 py-2 rounded-xl bg-zinc-800 text-white placeholder-gray-400"
                />
            </div>

            <div className="justify-center grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {tracks.map((track) => (
                    <AudioCard key={track.id} id={track.id} title={track.name} thumbnails={track.cover_urls} />
                ))}

                {/*{dummyData.map((item, index) => (*/}
                {/*    <AudioCard key={index} title={item.title} thumbnails={item.thumbnails}/>*/}
                {/*))}*/}
            </div>

            {loading && (
                <p className="text-center mt-4 text-gray-400">Загрузка...</p>
            )}

            {hasMore && (
                <div ref={ref} className="h-10 mt-8" />
            )}

            {!hasMore && (
                <p className="text-center mt-4 text-gray-500">Больше записей нет</p>
            )}
        </main>
    )
}