
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stars = [
  {
    x: 12,
    y: 48,
    message: "Cada comienzo es una oportunidad para descubrir de lo que eres capaz.",
  },
  {
    x: 31,
    y: 20,
    message: "Todo el esfuerzo que has puesto en tu camino merece ser reconocido.",
  },
  {
    x: 50,
    y: 48,
    message: "No tienes que ser perfecta. Solo tienes que confiar en lo que has aprendido.",
  },
  {
    x: 69,
    y: 20,
    message: "Los nervios no disminuyen todo lo que sabes ni todo lo que has conseguido.",
  },
  {
    x: 88,
    y: 48,
    message: "Juli, nunca olvides que tienes una luz propia que merece brillar.",
  },
];

export default function Constellation() {
  const [activeStar, setActiveStar] = useState(0);
  const [completed, setCompleted] = useState(false);

  const discoverStar = (index: number) => {
    if (index !== activeStar || completed) return;

    if (index === stars.length - 1) {
      setCompleted(true);
    } else {
      setActiveStar((previous) => previous + 1);
    }
  };

  const reset = () => {
    setActiveStar(0);
    setCompleted(false);
  };

  return (
    <section className="juli-constellation">

      <span className="subtitle">
        CARTOGRAFÍA DEL UNIVERSO
      </span>

      <h2>Una estrella lleva tu nombre</h2>

      <p className="constellation-description">
        Cinco estrellas, cinco pequeños descubrimientos.
        Explora cada una y descubre lo que guarda para ti.
      </p>

      <div className="constellation-space">

        <div className="constellation-nebula" />

        <svg
          viewBox="0 0 100 70"
          preserveAspectRatio="none"
          className="constellation-svg"
        >
          {stars.slice(1, completed ? 5 : activeStar + 1).map(
            (star, index) => (
              <motion.line
                key={index}
                x1={stars[index].x}
                y1={stars[index].y}
                x2={star.x}
                y2={star.y}
                stroke="#8ed5ff"
                strokeWidth="0.35"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1 }}
              />
            )
          )}
        </svg>

        {stars.map((star, index) => {
          const discovered = completed || index < activeStar;
          const available = index === activeStar && !completed;

          return (
            <motion.button
              key={index}
              className={`juli-star ${
                discovered ? "star-discovered" : ""
              } ${available ? "star-available" : ""}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
              onClick={() => discoverStar(index)}
              disabled={!available}
              aria-label={`Estrella ${index + 1}`}
              whileHover={available ? { scale: 1.4 } : {}}
              whileTap={available ? { scale: 0.8 } : {}}
            >
              ✦
            </motion.button>
          );
        })}

        {completed && (
          <motion.div
            className="constellation-name"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            JULI
          </motion.div>
        )}

      </div>

      <div className="constellation-counter">
        {completed ? 5 : activeStar} / 5 ESTRELLAS
      </div>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key={activeStar}
            className="constellation-message"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span>✧</span>

            <p>
              {activeStar === 0
                ? "Hay una estrella esperando por ti. Descúbrela."
                : stars[activeStar - 1].message}
            </p>

            <small>
              {activeStar + 1 === 5
                ? "Una última estrella te espera..."
                : "Continúa explorando el universo"}
            </small>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            className="constellation-finale"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="final-glow">✧</span>

            <h3>El universo ya conoce tu nombre</h3>

            <p>
              Entre millones de estrellas, esta constelación
              tiene algo que la hace diferente: lleva tu nombre.
              Nunca olvides lo mucho que vale tu luz, Juli.
            </p>

            <button onClick={reset}>
              Volver a explorar ✨
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
