/* ============================================================
   MusicPlayer — Reproductor de "Spaces" de One Direction
   Nota: La canción se puede reproducir desde Spotify, YouTube Music, etc.
   ============================================================ */
import { useState, useRef } from "react";
import { Music, Pause, Play } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          setShowInfo(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Info tooltip */}
      {showInfo && (
        <div
          className="absolute bottom-20 right-0 glass-card p-4 rounded-lg text-sm max-w-xs mb-2"
          style={{
            background: "oklch(0.14 0.04 265 / 90%)",
            backdropFilter: "blur(16px)",
            border: "1px solid oklch(0.78 0.12 20 / 50%)",
            color: "oklch(0.85 0.03 60)",
          }}
        >
          <p className="font-semibold mb-2" style={{ color: "oklch(0.82 0.1 55)" }}>
            🎵 Spaces - One Direction
          </p>
          <p className="text-xs leading-relaxed mb-3">
            Para disfrutar de la música, abre Spotify, YouTube Music o Apple Music y busca "Spaces" de One Direction.
          </p>
          <button
            onClick={() => setShowInfo(false)}
            className="text-xs px-3 py-1 rounded"
            style={{
              background: "oklch(0.78 0.12 20 / 30%)",
              color: "oklch(0.82 0.1 55)",
            }}
          >
            Entendido
          </button>
        </div>
      )}

      {/* Botón de reproducción */}
      <button
        onClick={togglePlay}
        className="glass-card glow-box p-4 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "oklch(0.14 0.04 265 / 80%)",
          backdropFilter: "blur(16px)",
          border: "1px solid oklch(0.78 0.12 20 / 50%)",
        }}
        title="Reproducir 'Spaces' de One Direction"
      >
        {isPlaying ? (
          <Pause size={24} style={{ color: "oklch(0.82 0.1 55)" }} />
        ) : (
          <Music size={24} style={{ color: "oklch(0.82 0.1 55)" }} />
        )}
      </button>

      {/* Audio element - Placeholder */}
      <audio
        ref={audioRef}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Indicador de reproducción */}
      {isPlaying && (
        <div
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse"
          style={{ background: "oklch(0.78 0.12 20)" }}
        />
      )}
    </div>
  );
}
