type AudioCardProps = {
    title: string
    thumbnails: string[]
}

export function AudioCard({ title, thumbnails }: AudioCardProps) {
    return (
        <div className="bg-zinc-800 rounded-2xl shadow-md p-4 w-full sm:w-72 flex flex-col gap-3">
            {/* Название */}
            <h3 className="text-white text-lg font-semibold break-words leading-snug">
                {title}
            </h3>

            {/* Галерея */}
            <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent pb-1">
                {thumbnails.map((src, idx) => (
                    <img
                        key={idx}
                        src={src}
                        alt={`preview-${idx}`}
                        className="h-16 w-16 rounded-lg object-cover shrink-0"
                    />
                ))}
            </div>
        </div>
    )
}