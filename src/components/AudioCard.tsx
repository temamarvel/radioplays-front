type AudioCardProps = {
    title: string
    thumbnails: string[]
}

// export function AudioCard({ title, thumbnails }: AudioCardProps) {
//     return (
//         <div className="bg-zinc-800 rounded-2xl shadow-md p-4 w-full sm:w-72 flex flex-col gap-3">
//             {/* Название */}
//             <h3 className="text-white text-lg font-semibold break-words leading-snug">
//                 {title}
//             </h3>
//
//             {/* Галерея */}
//             <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent pb-1">
//                 {thumbnails.map((src, idx) => (
//                     <img
//                         key={idx}
//                         src={src}
//                         alt={`preview-${idx}`}
//                         className="h-16 w-16 rounded-lg object-cover shrink-0"
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }


export function AudioCard({ title, thumbnails }: AudioCardProps) {
    return (
        <div className="w-full max-w-[300px] bg-zinc-800 rounded-xl shadow-md overflow-hidden flex flex-col aspect-square">
            {/* Верх: заголовок */}
            <div className="p-3 border-b border-zinc-700">
                <h2 className="text-sm font-medium text-white leading-snug break-words">
                    {title}
                </h2>
            </div>

            {/* Низ: горизонтальная галерея */}
            <div className="flex-1 overflow-hidden">
                <div className="flex gap-2 overflow-x-auto h-full p-2">
                    {thumbnails && thumbnails.length > 0 ? (
                        thumbnails.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`thumbnail-${idx}`}
                                className="h-full aspect-square rounded-lg object-cover flex-shrink-0"
                            />
                        ))
                    ) : (
                        <div className="text-sm text-gray-400 flex items-center justify-center w-full h-full">
                            нет обложек
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}