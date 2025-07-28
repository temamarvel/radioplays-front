import { fetchTrackById } from "@/lib/api";
import { notFound } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
};

export default async function TrackPage({ params }: Props) {
    const track = await fetchTrackById(params.id);

    if (!track) {
        notFound();
    }

    return (
        <main className="min-h-screen px-4 py-8 text-white bg-zinc-950">
            <h1 className="text-3xl font-bold mb-4">{track.name}</h1>
            <p>Описание: {track.description}</p>

            <div className="flex gap-2 mt-4 overflow-x-auto">
                {track.cover_urls.map((url: string, idx: number) => (
                    <img
                        key={idx}
                        src={url}
                        alt={`cover-${idx}`}
                        className="h-40 aspect-square object-cover rounded"
                    />
                ))}
            </div>

            {/*<audio controls className="mt-6 w-full">*/}
            {/*    <source src={track.audio_url} type="audio/mpeg" />*/}
            {/*    Ваш браузер не поддерживает аудио.*/}
            {/*</audio>*/}
        </main>
    );
}