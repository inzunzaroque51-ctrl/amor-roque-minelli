/* ============================================================
   YouTubeMusicPlayer — Reproductor de "Spaces" de One Direction
   Se reproduce automáticamente en background
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function YouTubeMusicPlayer() {
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (iframeRef.current) {
      iframeRef.current.style.display = isMuted ? "block" : "none";
    }
  };

  return (
    <>
      {/* Reproductor embebido (oculto visualmente pero activo) */}
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
        src="https://www.youtube.com/embed/Xap94aAgSWM?autoplay=1&controls=0&modestbranding=1&rel=0&fs=0&mute=1"
        allow="autoplay; encrypted-media"
        title="Spaces - One Direction (Audio)"
      />

      {/* Botón de control de volumen */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 glass-card glow-box p-4 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-50"
        style={{
          background: "oklch(0.14 0.04 265 / 80%)",
          backdropFilter: "blur(16px)",
          border: "1px solid oklch(0.78 0.12 20 / 50%)",
        }}
        title={isMuted ? "Activar música" : "Silenciar música"}
      >
        {isMuted ? (
          <VolumeX size={24} style={{ color: "oklch(0.82 0.1 55)" }} />
        ) : (
          <Volume2 size={24} style={{ color: "oklch(0.82 0.1 55)" }} />
        )}
      </button>

      {/* Indicador de reproducción */}
      {!isMuted && (
        <div
          className="fixed bottom-6 left-6 w-16 h-16 rounded-full pointer-events-none z-40"
          style={{
            background: "radial-gradient(circle, oklch(0.78 0.12 20 / 40%) 0%, transparent 70%)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      )}

      {/* Nota para celular */}
      <div
        className="fixed bottom-24 left-6 glass-card p-3 rounded-lg text-xs max-w-xs z-40"
        style={{
          background: "oklch(0.14 0.04 265 / 70%)",
          backdropFilter: "blur(16px)",
          border: "1px solid oklch(0.78 0.12 20 / 30%)",
          color: "oklch(0.75 0.04 60)",
          display: isMuted ? "none" : "block",
        }}
      >
        <p style={{ color: "oklch(0.82 0.1 55)", marginBottom: "4px", fontWeight: "600" }}>
          🎵 Spaces
        </p>
        <p>Toca el botón de volumen para reproducir la música</p>
      </div>
    </>
  );
}
