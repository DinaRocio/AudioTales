"use client";

import { isToday, parseISO, format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

const tales = [
  // {
  //   title: "El primer cuento",
  //   audio: "/audios/primer-cuento.mp3",
  //   publishDate: "2025-02-15",
  // },
  // {
  //   title: "El segundo cuento",
  //   audio: "/audios/segundo-cuento.mp3",
  //   publishDate: "2025-02-10",
  // },
  {
    title: "El primer cuento: Última Conexión",
    audio: "/audios/tale-1-ultima-conexion.mp3",
    publishDate: "2025-02-12",
  },
];

const instructionsAudio = "/audios/instructions.mp3";

export default function Home() {
  const today = new Date();
  const publishedAudioTale = tales.find((cuento) =>
    isToday(new Date(cuento.publishDate))
  );

  const recentlyPublishedTales = tales
    .filter((cuento) => new Date(cuento.publishDate) <= today)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  const [currentAudio, setCurrentAudio] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-300 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-lg w-full mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Nuestra Biblioteca de Cuentos
        </h1>
        <div className="mb-4">
          <h2 className="text-lg font-medium text-indigo-600 mb-2">
            Instrucciones
          </h2>
          <audio controls className="w-full" src={instructionsAudio}>
            Tu navegador no soporta el audio.
          </audio>
        </div>
        {publishedAudioTale ? (
          <div>
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              {publishedAudioTale.title}
            </h2>
            <audio
              controls
              className="w-full"
              src={publishedAudioTale.audio}
              onPlay={() => setCurrentAudio(publishedAudioTale.audio)}
            >
              Tu navegador no soporta el audio.
            </audio>
          </div>
        ) : (
          <p className="text-gray-700">
            No hay cuentos disponibles hoy. ¡Vuelve pronto!
          </p>
        )}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-xl text-center max-w-lg w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Cuentos recientemente publicados
        </h2>
        <ul className="space-y-2">
          {recentlyPublishedTales.map((cuento, index) => (
            <li
              key={index}
              className="flex flex-wrap items-center justify-between p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
              onClick={() => setCurrentAudio(cuento.audio)}
            >
              <span className="text-gray-800 font-medium w-full sm:w-auto">
                {cuento.title}
              </span>
              <span className="text-sm text-gray-500 w-full sm:w-auto">
                {format(parseISO(cuento.publishDate), "dd MMM yyyy")}
              </span>
            </li>
          ))}
        </ul>

        {currentAudio && (
          <div className="mt-4">
            <audio controls autoPlay className="w-full" src={currentAudio}>
              Tu navegador no soporta el audio.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}
