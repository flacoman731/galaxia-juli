
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Planet from "../components/Planet";
import Constellation from "../components/Constellation";

const planets = [
  {
    name: "Confianza",
    description: "Cree en tu luz",
    color: "radial-gradient(circle at 30% 30%, #c4e9ff, #3988d0 50%, #102c65)",
    className: "planet-one",
    message:
      "Juli, confía en ti. Has llegado hasta aquí gracias a todo lo que has aprendido y al esfuerzo que has puesto en el camino. No permitas que los nervios te hagan olvidar de lo que eres capaz.",
  },
  {
    name: "Esfuerzo",
    description: "Todo tiene valor",
    color: "radial-gradient(circle at 30% 30%, #f3d4ff, #9761d2 50%, #38215e)",
    className: "planet-two",
    message:
      "Cada hora de estudio, cada tema que intentaste comprender y cada momento en el que decidiste continuar tiene valor. Nada de ese esfuerzo ha sido en vano.",
  },
  {
    name: "Tranquilidad",
    description: "Respira y continúa",
    color: "radial-gradient(circle at 30% 30%, #c6fff1, #39a9a0 50%, #124c65)",
    className: "planet-three",
    message:
      "No necesitas tener todas las respuestas de la vida en un solo examen. Ve con calma, lee cada pregunta y date la oportunidad de demostrar lo que sabes.",
  },
  {
    name: "Sueños",
    description: "Todo lo que viene",
    color: "radial-gradient(circle at 30% 30%, #fff0bd, #d89b48 50%, #75412c)",
    className: "planet-four",
    message:
      "Todavía hay muchísimas cosas bonitas por vivir, aprender y conseguir. Este modular es solamente una parte de un camino mucho más grande.",
  },
  {
    name: "Tu estrella",
    description: "Un mensaje especial",
    color: "radial-gradient(circle at 30% 30%, #ffffff, #92aaff 45%, #454d9b)",
    className: "planet-five",
    message:
      "Juli, quiero que recuerdes algo: más allá de cualquier resultado, me siento orgulloso de que sigas intentando alcanzar tus metas. Tienes muchísimo por delante y mereces reconocer cada paso que das. Nunca olvides lo valiosa que es tu luz.",
  },
];

export default function Home() {
  const [selectedPlanet, setSelectedPlanet] =
    useState<(typeof planets)[number] | null>(null);

    const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const [examStarted, setExamStarted] = useState(false);

useEffect(() => {
  const updateCountdown = () => {
    const target = new Date(2026, 10, 18, 0, 0, 0).getTime();
    const now = Date.now();
    const difference = target - now;

    if (difference <= 0) {
      setExamStarted(true);
      return;
    }

    setTimeLeft({
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    });
  };

  updateCountdown();

  const interval = setInterval(updateCountdown, 1000);

  return () => clearInterval(interval);
}, []);

  return (
    <main className="galaxy">
      <div className="stars" />

      <motion.div
        className="welcome"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <span className="subtitle">
          UN UNIVERSO HECHO PARA TI
        </span>

        <h1>
          Una galaxia
          <br />
          llamada <span>Juli</span>
        </h1>

        <p>
          Hay universos enteros por descubrir,
          y este pequeño espacio es solo para ti.
        </p>

        <button
          onClick={() =>
            document.getElementById("universe")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explorar mi universo ✦
        </button>
      </motion.div>

      <section id="universe" className="universe">
        <span className="subtitle">
          CINCO PEQUEÑOS MUNDOS
        </span>

        <h2>Un universo para recordar tu luz</h2>

        <p className="universe-intro">
          Cada planeta guarda un mensaje.
          Elige uno y descubre lo que tiene para ti.
        </p>

        <div className="planet-grid">
          {planets.map((planet) => (
            <Planet
              key={planet.name}
              {...planet}
              onClick={() => setSelectedPlanet(planet)}
            />
          ))}
        </div>
      </section>

      <Constellation />


<section className="countdown-section">
  <span className="subtitle">
    UN NUEVO DESTINO TE ESPERA
  </span>

  <h2>
    {examStarted
      ? "Hoy es tu momento, Juli ✨"
      : "Rumbo a un nuevo comienzo"}
  </h2>

  <p className="countdown-description">
    Este miércoles tienes una nueva oportunidad
    de demostrar todo lo que has aprendido.
    Recuerda que cada paso que has dado
    te ha traído hasta aquí.
  </p>

  {!examStarted ? (
    <div className="countdown-grid">
      <div className="countdown-box">
        <strong>{timeLeft.days}</strong>
        <span>DÍAS</span>
      </div>

      <div className="countdown-box">
        <strong>{timeLeft.hours}</strong>
        <span>HORAS</span>
      </div>

      <div className="countdown-box">
        <strong>{timeLeft.minutes}</strong>
        <span>MINUTOS</span>
      </div>

      <div className="countdown-box">
        <strong>{timeLeft.seconds}</strong>
        <span>SEGUNDOS</span>
      </div>
    </div>
  ) : (
    <p className="countdown-message">
      Llegó el momento de confiar en ti.
    </p>
  )}

  <p className="countdown-message">
    Tu historia es mucho más grande que un solo examen.
  </p>
</section>



      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPlanet(null)}
          >
            <motion.div
              className="message-modal"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(event) => event.stopPropagation()}
            >
              <span className="modal-star">✦</span>

              <span className="subtitle">
                MENSAJE DESDE EL UNIVERSO
              </span>

              <h2>{selectedPlanet.name}</h2>

              <p>{selectedPlanet.message}</p>

              <button
                onClick={() => setSelectedPlanet(null)}
              >
                Volver a las estrellas ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
