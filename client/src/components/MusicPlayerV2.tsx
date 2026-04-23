/* ============================================================
   MusicPlayerV2 — Reproductor de música mejorado
   Soporta múltiples fuentes de audio
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function MusicPlayerV2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // URL de audio de alta calidad - usando una fuente pública de música romántica
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.log("Error al reproducir:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} src={audioUrl} loop />

      {/* Reproductor flotante */}
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
          🎵 Nuestra canción
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

          {/* Barra de progreso */}
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = parseFloat(e.target.value);
                }
              }}
              className="w-full h-1 rounded-lg appearance-none cursor-pointer"
              style={{
                background: "oklch(0.2 0.04 265)",
                accentColor: "oklch(0.78 0.12 20)",
              }}
            />
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

        {/* Tiempo */}
        <div
          className="text-xs text-center"
          style={{ color: "oklch(0.65 0.05 60)" }}
        >
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Indicador de reproducción */}
        {isPlaying && (
          <div
            className="mt-3 h-1 rounded-full"
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
