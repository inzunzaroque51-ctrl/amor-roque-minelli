/* ============================================================
   MusicPlayerV2 — Reproductor de "Spaces" de One Direction
   Usa YouTube embed para mejor compatibilidad
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function MusicPlayerV2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Intentar reproducir automáticamente después de que carga la página
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        try {
          // Enviar mensaje para reproducir
          iframeRef.current.contentWindow?.postMessage(
            { action: "play" },
            "*"
          );
        } catch (e) {
          console.log("Auto-play iniciado");
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (iframeRef.current) {
      try {
        iframeRef.current.contentWindow?.postMessage(
          { action: isPlaying ? "pause" : "play" },
          "*"
        );
      } catch (e) {
        console.log("Control de reproducción");
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (iframeRef.current) {
      iframeRef.current.style.opacity = isMuted ? "1" : "0";
    }
  };

  return (
    <>
      {/* Reproductor embebido de YouTube (oculto) */}
      <iframe
        ref={iframeRef}
        style={{
          position: "fixed",
          bottom: "-200px",
          right: "-200px",
          width: "1px",
          height: "1px",
          border: "none",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
        src="https://www.youtube.com/embed/K4e_0VvTqv0?autoplay=1&controls=0&modestbranding=1&rel=0&fs=0&mute=1"
        allow="autoplay; encrypted-media"
        title="Spaces - One Direction"
      />

      {/* Reproductor visual flotante */}
      <div
        className="fixed bottom-6 left-6 glass-card p-4 rounded-2xl z-50 max-w-xs"
        style={{
          background: "oklch(0.14 0.04 265 / 85%)",
          backdropFilter: "blur(16px)",
          border: "1px solid oklch(0.78 0.12 20 / 50%)",
        }}
      >
        {/* Título */}
        <p
          className="text-sm font-semibold mb-3"
          style={{ color: "oklch(0.82 0.1 55)" }}
        >
          🎵 Spaces - One Direction
        </p>

        {/* Controles principales */}
        <div className="flex items-center gap-3 mb-3">
          {/* Botón Play/Pause */}
          <button
            onClick={togglePlay}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              background: "oklch(0.78 0.12 20 / 30%)",
              border: "1px solid oklch(0.78 0.12 20 / 50%)",
            }}
          >
            {isPlaying ? (
              <Pause size={20} style={{ color: "oklch(0.82 0.1 55)" }} />
            ) : (
              <Play size={20} style={{ color: "oklch(0.82 0.1 55)" }} />
            )}
          </button>

          {/* Información */}
          <div className="flex-1">
            <p
              className="text-xs"
              style={{ color: "oklch(0.65 0.05 60)" }}
            >
              4:17
            </p>
          </div>

          {/* Botón Mute */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: "oklch(0.78 0.12 20 / 30%)",
              border: "1px solid oklch(0.78 0.12 20 / 50%)",
            }}
          >
            {isMuted ? (
              <VolumeX size={20} style={{ color: "oklch(0.82 0.1 55)" }} />
            ) : (
              <Volume2 size={20} style={{ color: "oklch(0.82 0.1 55)" }} />
            )}
          </button>
        </div>

        {/* Indicador de reproducción */}
        {isPlaying && (
          <div
            className="h-1 rounded-full"
            style={{
              background: "linear-gradient(90deg, oklch(0.78 0.12 20) 0%, transparent 100%)",
              animation: "pulse 1s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </>
  );
}
