'use client'

import { useState } from 'react'

import { AudioCard } from "@/components/AudioCard"

export default function Home() {
  const [search, setSearch] = useState('')

    // Примерные данные
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
        },{
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

  return (
      <main className="min-h-screen px-4 py-8 bg-zinc-950 text-white">
        {/* Название сайта */}
        <h1 className="text-4xl font-bold mb-6 text-center">Retrofon</h1>

        {/* Поисковая строка */}
        <div className="flex justify-center mb-8">
            <input
                type="text"
                placeholder="Поиск аудиозаписей..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-xl px-4 py-2 rounded-xl bg-zinc-800 text-white placeholder-gray-400"
            />
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Тут позже будут карточки */}
            {dummyData.map((item, index) => (
                <AudioCard key={index} title={item.title} thumbnails={item.thumbnails} />
            ))}
        </div>
      </main>
  )
}