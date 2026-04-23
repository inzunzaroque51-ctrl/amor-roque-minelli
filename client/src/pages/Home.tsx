/* ============================================================
   Home — Roque & Minelli 💕
   Diseño: Noche Estrellada Mágica
   Paleta: Azul noche + Rosa dorado + Oro suave
   Tipografía: Cormorant Garamond + DM Sans + Dancing Script
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import StarCanvas from "@/components/StarCanvas";
import FloatingHearts from "@/components/FloatingHearts";
import { useInView } from "@/hooks/useInView";

// ── Contador de tiempo ──────────────────────────────────────
function useTimeCounter(startDate: Date) {
  const [elapsed, setElapsed] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const totalSeconds = Math.floor(diff / 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;
      const totalDays = Math.floor(totalHours / 24);
      const months = Math.floor(totalDays / 30);
      const days = totalDays % 30;
      setElapsed({ months, days, hours, minutes, seconds });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [startDate]);

  return elapsed;
}

// ── Typewriter ──────────────────────────────────────────────
function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [started, text]);

  return (
    <span className={displayed.length < text.length ? "typewriter-cursor" : ""}>
      {displayed}
    </span>
  );
}

// ── Sección animada ─────────────────────────────────────────
function AnimSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Razón card ──────────────────────────────────────────────
function ReasonCard({ number, text, icon, delay }: {
  number: number;
  text: string;
  icon: string;
  delay: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className="glass-card p-6 flex gap-4 items-start"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <span className="text-3xl flex-shrink-0 mt-1">{icon}</span>
      <div>
        <span
          className="font-display text-5xl font-bold block leading-none mb-1"
          style={{ color: "oklch(0.78 0.12 20 / 40%)" }}
        >
          {String(number).padStart(2, "0")}
        </span>
        <p className="text-sm leading-relaxed" style={{ color: "oklch(0.85 0.03 60)" }}>
          {text}
        </p>
      </div>
    </div>
  );
}

// ── Mensaje card ────────────────────────────────────────────
function MessageCard({ title, body, icon }: { title: string; body: string; icon: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className="glass-card p-8 text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.9)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3
        className="font-display text-2xl font-semibold mb-3"
        style={{ color: "oklch(0.82 0.1 55)" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "oklch(0.8 0.03 60)" }}>
        {body}
      </p>
    </div>
  );
}

// ── Contador unit ───────────────────────────────────────────
function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="font-display text-5xl md:text-6xl font-bold tabular-nums"
        style={{ color: "oklch(0.82 0.1 55)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs uppercase tracking-widest" style={{ color: "oklch(0.65 0.05 60)" }}>
        {label}
      </span>
    </div>
  );
}

// ── Separador decorativo ────────────────────────────────────
function StarDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 section-divider" />
      <span className="text-xl" style={{ color: "oklch(0.82 0.1 55)" }}>✦</span>
      <div className="flex-1 section-divider" />
    </div>
  );
}

// ── MAIN ────────────────────────────────────────────────────
export default function Home() {
  // Fecha de inicio de la relación — 2 años 9 meses atrás
  // Calculado desde hoy hacia atrás
  const startDate = useRef(new Date(2022, 6, 23)); // 23 de julio de 2022 (2 años 9 meses atrás)
  const elapsed = useTimeCounter(startDate.current);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const reasons = [
    { icon: "🌙", text: "Porque tu sonrisa ilumina mis noches más oscuras y hace que todo tenga sentido." },
    { icon: "⭐", text: "Porque me haces querer ser mejor persona cada día que pasa a tu lado." },
    { icon: "🌹", text: "Porque en tus ojos encontré el hogar que siempre estuve buscando." },
    { icon: "💫", text: "Porque tu risa es la canción favorita que mi corazón nunca se cansa de escuchar." },
    { icon: "🔥", text: "Porque contigo, hasta los momentos más simples se convierten en recuerdos mágicos." },
    { icon: "🌌", text: "Porque eres la persona con quien quiero ver todas las estrellas del universo." },
    { icon: "💎", text: "Porque tu amor me hace sentir que soy el hombre más afortunado del mundo." },
    { icon: "🦋", text: "Porque cada vez que pienso en ti, siento mariposas que nunca se van." },
  ];

  const messages = [
    {
      icon: "🌙",
      title: "Mi Noche Favorita",
      body: "Cada noche que paso contigo es una aventura nueva. Tu presencia convierte cualquier lugar en el más especial del universo.",
    },
    {
      icon: "💌",
      title: "Lo Que Siento",
      body: "Hay palabras que no alcanzan para describir lo que me das. Pero si pudiera resumirlo en una: eres mi todo, Minelli.",
    },
    {
      icon: "🌟",
      title: "Nuestro Futuro",
      body: "Quiero seguir sumando meses, años y toda una vida de momentos hermosos junto a ti. Esto es solo el comienzo.",
    },
  ];

  return (
    <div className="relative min-h-screen night-gradient" style={{ zIndex: 1 }}>
      <StarCanvas />
      <FloatingHearts />

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ zIndex: 2 }}
      >
        {/* Imagen de fondo hero */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663592677587/KwkEy55RzjWjKS3p5qS54P/hero-stars-BkjGXe5uih7zQs7q3veHj8.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            opacity: 0.35,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, oklch(0.09 0.025 265 / 20%) 0%, oklch(0.09 0.025 265 / 80%) 80%, oklch(0.09 0.025 265) 100%)",
          }}
        />

        {/* Contenido hero */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            className="font-script text-xl md:text-2xl mb-4 fade-in-up"
            style={{ color: "oklch(0.82 0.1 55)", animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            Para ti, con todo mi amor
          </p>

          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-2 shimmer-text fade-in-up"
            style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
          >
            Minelli
          </h1>

          <div
            className="fade-in-up"
            style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards" }}
          >
            <span
              className="heartbeat text-5xl md:text-6xl block my-4"
            >
              ❤️
            </span>
          </div>

          <h2
            className="font-display text-3xl md:text-5xl font-light italic mb-6 fade-in-up"
            style={{
              color: "oklch(0.9 0.04 60)",
              animationDelay: "1s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <Typewriter text="Hoy cumplimos un mes más juntos" delay={1200} />
          </h2>

          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed fade-in-up"
            style={{
              color: "oklch(0.75 0.04 60)",
              animationDelay: "1.4s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Cada día a tu lado es un regalo que atesoro con todo mi corazón. Gracias por existir, por elegirme, y por hacer de mi vida algo extraordinario.
          </p>

          <div
            className="mt-8 fade-in-up"
            style={{ animationDelay: "1.8s", opacity: 0, animationFillMode: "forwards" }}
          >
            <p className="font-script text-2xl" style={{ color: "oklch(0.78 0.12 20)" }}>
              — Roque
            </p>
          </div>

          {/* Scroll hint */}
          <div
            className="mt-16 fade-in-up"
            style={{ animationDelay: "2.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            <div
              className="flex flex-col items-center gap-2"
              style={{ color: "oklch(0.65 0.05 60)" }}
            >
              <span className="text-xs uppercase tracking-widest">Desliza para descubrir</span>
              <div
                className="w-px h-12 mx-auto"
                style={{
                  background: "linear-gradient(to bottom, oklch(0.78 0.12 20 / 60%), transparent)",
                  animation: "fadeInUp 1s ease-in-out infinite alternate",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTADOR ── */}
      <section className="relative py-24 px-4" style={{ zIndex: 2 }}>
        <div className="max-w-4xl mx-auto">
          <AnimSection className="text-center mb-12">
            <p className="font-script text-lg mb-2" style={{ color: "oklch(0.82 0.1 55)" }}>
              Llevamos juntos
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold glow-gold" style={{ color: "oklch(0.82 0.1 55)" }}>
              Cada segundo contigo vale infinito
            </h2>
          </AnimSection>

          <AnimSection delay={200}>
            <div className="glass-card glow-box p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 items-center justify-items-center">
                <CountUnit value={elapsed.months} label="meses" />
                <div className="hidden md:block font-display text-4xl" style={{ color: "oklch(0.78 0.12 20 / 50%)" }}>:</div>
                <CountUnit value={elapsed.days} label="días" />
                <div className="hidden md:block font-display text-4xl" style={{ color: "oklch(0.78 0.12 20 / 50%)" }}>:</div>
                <CountUnit value={elapsed.hours} label="horas" />
              </div>
              <StarDivider />
              <div className="grid grid-cols-2 gap-6 items-center justify-items-center max-w-xs mx-auto">
                <CountUnit value={elapsed.minutes} label="minutos" />
                <CountUnit value={elapsed.seconds} label="segundos" />
              </div>
              <p className="text-center mt-6 text-sm font-script text-2xl" style={{ color: "oklch(0.78 0.12 20)" }}>
                de amor, risas y momentos únicos ✨
              </p>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── IMAGEN CORAZÓN GALAXIA ── */}
      <section className="relative py-16 px-4 overflow-hidden" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimSection>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663592677587/KwkEy55RzjWjKS3p5qS54P/heart-galaxy-diUNbyahsjUYfwE5oUrHTE.webp"
                alt="Corazón de estrellas"
                className="w-full max-w-sm mx-auto rounded-2xl"
                style={{ boxShadow: "0 0 60px oklch(0.78 0.12 20 / 30%)" }}
              />
            </AnimSection>
            <AnimSection delay={200} className="text-center md:text-left">
              <p className="font-script text-xl mb-3" style={{ color: "oklch(0.82 0.1 55)" }}>
                Mi universo eres tú
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: "oklch(0.9 0.04 60)" }}>
                Eres la estrella más brillante de mi cielo
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.75 0.04 60)" }}>
                Entre tantas personas, llegaste tú y todo cambió. Minelli, eres esa luz que siempre encuentro, la razón por la que sonrío sin darme cuenta. No necesito mirar al cielo para ver mi estrella favorita, porque la tengo en ti.
              </p>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── RAZONES ── */}
      <section className="relative py-24 px-4" style={{ zIndex: 2 }}>
        <div className="max-w-4xl mx-auto">
          <AnimSection className="text-center mb-14">
            <p className="font-script text-xl mb-2" style={{ color: "oklch(0.82 0.1 55)" }}>
              Razones infinitas, pero aquí van algunas
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "oklch(0.9 0.04 60)" }}>
              Por qué te amo, Minelli
            </h2>
            <StarDivider />
          </AnimSection>

          <div className="grid md:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <ReasonCard
                key={i}
                number={i + 1}
                text={r.text}
                icon={r.icon}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGEN LUNA ── */}
      <section className="relative py-16 px-4" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimSection delay={200} className="text-center md:text-right order-2 md:order-1">
              <p className="font-script text-xl mb-3" style={{ color: "oklch(0.82 0.1 55)" }}>
                Nuestro lugar en el universo
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: "oklch(0.9 0.04 60)" }}>
                Contigo hasta la luna y más allá
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "oklch(0.75 0.04 60)" }}>
                Si pudiera llevarte a cualquier lugar del universo, te llevaría a sentarnos en la luna, con las piernas colgando entre las nubes, mirando las estrellas y hablando de todo y de nada.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "oklch(0.75 0.04 60)" }}>
                Porque contigo, hasta lo imposible se siente real. Eres mi aventura más hermosa.
              </p>
            </AnimSection>
            <AnimSection className="order-1 md:order-2">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663592677587/KwkEy55RzjWjKS3p5qS54P/moon-couple-78aw6N46g7SpFVAWson4B6.webp"
                alt="Pareja en la luna"
                className="w-full max-w-sm mx-auto rounded-2xl"
                style={{ boxShadow: "0 0 60px oklch(0.82 0.1 55 / 25%)" }}
              />
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── MENSAJES ── */}
      <section className="relative py-24 px-4" style={{ zIndex: 2 }}>
        <div className="max-w-4xl mx-auto">
          <AnimSection className="text-center mb-14">
            <p className="font-script text-xl mb-2" style={{ color: "oklch(0.82 0.1 55)" }}>
              Desde lo más profundo de mi corazón
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "oklch(0.9 0.04 60)" }}>
              Palabras que siento
            </h2>
            <StarDivider />
          </AnimSection>
          <div className="grid md:grid-cols-3 gap-6">
            {messages.map((m, i) => (
              <MessageCard key={i} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ROSAS ── */}
      <section className="relative py-16 px-4 overflow-hidden" style={{ zIndex: 2 }}>
        <div className="max-w-5xl mx-auto">
          <AnimSection className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "oklch(0.9 0.04 60)" }}>
              Para ti, estas rosas
            </h2>
            <p className="mt-3 text-base" style={{ color: "oklch(0.75 0.04 60)" }}>
              Porque mereces lo más hermoso del mundo
            </p>
          </AnimSection>
          <AnimSection delay={200}>
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 80px oklch(0.78 0.12 20 / 20%)" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663592677587/KwkEy55RzjWjKS3p5qS54P/roses-dark-Vu4LjEy6MXCQZR9VdS3ZMk.webp"
                alt="Rosas rojas"
                className="w-full object-cover"
                style={{ maxHeight: "420px" }}
              />
              <div
                className="absolute inset-0 flex items-end justify-center pb-10"
                style={{ background: "linear-gradient(to top, oklch(0.09 0.025 265 / 80%) 0%, transparent 60%)" }}
              >
                <p className="font-script text-3xl md:text-4xl text-center px-4" style={{ color: "oklch(0.95 0.05 80)" }}>
                  "Eres la flor más bella de mi jardín"
                </p>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── CARTA ── */}
      <section className="relative py-24 px-4" style={{ zIndex: 2 }}>
        <div className="max-w-2xl mx-auto text-center">
          <AnimSection>
            <p className="font-script text-xl mb-3" style={{ color: "oklch(0.82 0.1 55)" }}>
              Una carta especial para ti
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8" style={{ color: "oklch(0.9 0.04 60)" }}>
              Abre mi corazón
            </h2>

            {!showEnvelope ? (
              <button
                onClick={() => setShowEnvelope(true)}
                className="glass-card glow-box px-10 py-5 font-display text-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ color: "oklch(0.82 0.1 55)", border: "1px solid oklch(0.78 0.12 20 / 50%)" }}
              >
                💌 Toca para abrir la carta
              </button>
            ) : (
              <div
                className="glass-card glow-box p-8 md:p-12 text-left"
                style={{
                  animation: "fadeInUp 0.6s ease forwards",
                }}
              >
                <p className="font-script text-2xl mb-6 text-center" style={{ color: "oklch(0.82 0.1 55)" }}>
                  Mi amor, Minelli...
                </p>
                <div className="space-y-4 text-base leading-relaxed" style={{ color: "oklch(0.82 0.04 60)" }}>
                  <p>
                    Cuando pienso en todo lo que hemos vivido juntos, me doy cuenta de lo increíblemente afortunado que soy de tenerte en mi vida. Cada día a tu lado es una nueva razón para sonreír.
                  </p>
                  <p>
                    Recuerdo el momento en que te conocí y sentí que algo especial estaba comenzando. Y tenía razón. Tú llegaste a mi vida para quedarte, para llenarla de colores que nunca antes había visto.
                  </p>
                  <p>
                    Hoy, al celebrar un mes más juntos, quiero que sepas que mi amor por ti crece cada día. No hay palabras suficientes para describir lo que siento cuando estoy contigo, cuando escucho tu voz, cuando veo tu sonrisa.
                  </p>
                  <p>
                    Eres mi calma en medio de la tormenta, mi alegría en los días grises, mi hogar donde quiera que estemos. Eres, simplemente, lo mejor que me ha pasado.
                  </p>
                  <p>
                    Gracias por elegirme. Gracias por quedarte. Gracias por ser exactamente quien eres.
                  </p>
                </div>
                <div className="mt-8 text-right">
                  <p className="font-script text-2xl" style={{ color: "oklch(0.78 0.12 20)" }}>
                    Con todo mi amor,
                  </p>
                  <p className="font-script text-3xl font-bold" style={{ color: "oklch(0.82 0.1 55)" }}>
                    Roque ❤️
                  </p>
                </div>
              </div>
            )}
          </AnimSection>
        </div>
      </section>

      {/* ── PROMESAS ── */}
      <section className="relative py-24 px-4" style={{ zIndex: 2 }}>
        <div className="max-w-3xl mx-auto">
          <AnimSection className="text-center mb-14">
            <p className="font-script text-xl mb-2" style={{ color: "oklch(0.82 0.1 55)" }}>
              Mis promesas para ti
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "oklch(0.9 0.04 60)" }}>
              Lo que te juro cada día
            </h2>
            <StarDivider />
          </AnimSection>
          <div className="space-y-4">
            {[
              { icon: "🌙", promise: "Prometerte estar siempre cuando más me necesites, sin importar la hora ni la distancia." },
              { icon: "💫", promise: "Hacerte reír cada día, porque tu risa es la música más hermosa que he escuchado." },
              { icon: "🔒", promise: "Cuidar tu corazón como el tesoro más valioso que alguien me ha confiado." },
              { icon: "🌹", promise: "Sorprenderte y hacerte sentir especial, no solo hoy sino todos los días." },
              { icon: "⭐", promise: "Crecer contigo, aprender de ti, y construir juntos el futuro que ambos merecemos." },
            ].map((p, i) => (
              <AnimSection key={i} delay={i * 120}>
                <div className="glass-card p-5 flex items-center gap-4">
                  <span className="text-2xl flex-shrink-0">{p.icon}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.85 0.03 60)" }}>
                    {p.promise}
                  </p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIERRE ── */}
      <section className="relative py-32 px-4 text-center overflow-hidden" style={{ zIndex: 2 }}>
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, oklch(0.78 0.12 20 / 10%) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <AnimSection>
            <div className="heartbeat text-7xl mb-8">❤️</div>
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 shimmer-text">
              Te amo, Minelli
            </h2>
            <p className="font-script text-2xl md:text-3xl mb-4" style={{ color: "oklch(0.82 0.1 55)" }}>
              Hoy, mañana y siempre
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: "oklch(0.7 0.04 60)" }}>
              Esta página es solo una pequeña muestra de todo el amor que siento por ti. Gracias por hacer de mi vida algo extraordinario. Que sigamos sumando meses, años y toda una vida juntos. 🌟
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {["❤️", "💕", "💖", "💗", "💓", "💝", "💘", "💞"].map((h, i) => (
                <span
                  key={i}
                  className="text-3xl"
                  style={{
                    animation: `twinkle ${1.5 + i * 0.2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`,
                    display: "inline-block",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
            <p className="mt-12 font-script text-xl" style={{ color: "oklch(0.65 0.05 60)" }}>
              Con amor eterno — Roque 💫
            </p>
          </AnimSection>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative py-6 text-center text-xs"
        style={{ color: "oklch(0.45 0.03 265)", zIndex: 2 }}
      >
        <StarDivider />
        <p className="mt-4">Hecho con ❤️ por Roque, para Minelli — {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
