import { fetchTrackById } from "@/lib/api";
import { notFound } from "next/navigation";

type TrackPageParams = {
    params: Promise<{
        id: string;
    }>;
};

export default async function TrackPage({ params }: TrackPageParams) {
    const { id } = await params;
    const track = await fetchTrackById(id);

    if (!track) {
        notFound();
    }

    return (
        <main className="min-h-screen px-4 py-8 text-white bg-zinc-950">
            <h1 className="text-3xl font-bold mb-4">{track.name}</h1>
            {/*Нет нормального дескрипшена. Сделать этот раздел из метаданых. Подключить синхронизацию с Diskog*/}
            {/*Временно испотльзуем name*/}
            <p>Описание: {track.name}</p>

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

            <audio controls className="mt-6 w-full">
                {/*Сейчас есть только один трек для каждой записи*/}
                <source src={track.audio_urls[0]} type="audio/mpeg" />
                Ваш браузер не поддерживает аудио.
            </audio>
        </main>
    );
}