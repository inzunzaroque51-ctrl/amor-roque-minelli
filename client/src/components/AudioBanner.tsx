/* ============================================================
   AudioBanner — Banner para activar audio
   "What Makes You Beautiful" de One Direction
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioBanner() {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // URL de audio de "What Makes You Beautiful" - versión instrumental/limpia
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const activateAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // 40% de volumen
      audioRef.current.play().catch((err) => {
        console.log("Audio iniciado:", err);
      });
      setIsAudioActive(true);
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} src={audioUrl} loop muted={isMuted} />

      {/* Banner superior */}
      {!isAudioActive && (
        <div
          className="fixed top-0 left-0 right-0 z-50 py-4 px-4 text-center"
          style={{
            background: "linear-gradient(135deg, oklch(0.14 0.04 265 / 95%) 0%, oklch(0.2 0.05 280 / 90%) 100%)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid oklch(0.78 0.12 20 / 30%)",
          }}
        >
          <p
            className="text-sm md:text-base font-semibold mb-3"
            style={{ color: "oklch(0.85 0.05 60)" }}
          >
            💕 Activa el audio para una mejor experiencia
          </p>
          <button
            onClick={activateAudio}
            className="px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.12 20) 0%, oklch(0.7 0.15 25) 100%)",
              color: "oklch(0.95 0.01 60)",
              boxShadow: "0 4px 15px oklch(0.78 0.12 20 / 30%)",
            }}
          >
            Activar Audio 🎵
          </button>
        </div>
      )}

      {/* Indicador de audio activo y control de volumen */}
      {isAudioActive && (
        <div
          className="fixed top-4 right-4 z-50 glass-card p-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: "oklch(0.14 0.04 265 / 80%)",
            backdropFilter: "blur(16px)",
            border: "1px solid oklch(0.78 0.12 20 / 50%)",
          }}
        >
          <button
            onClick={toggleMute}
            className="p-2 rounded-full transition-all duration-300"
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeX size={20} style={{ color: "oklch(0.82 0.1 55)" }} />
            ) : (
              <Volume2 size={20} style={{ color: "oklch(0.82 0.1 55)" }} />
            )}
          </button>

          {/* Indicador de reproducción */}
          {!isMuted && (
            <div
              className="absolute w-10 h-10 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, oklch(0.78 0.12 20 / 40%) 0%, transparent 70%)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
