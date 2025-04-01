import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenido Principal */}
          <div>
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Desafía tus Límites en Transcendence
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Una plataforma de juegos que va más allá de la competencia.
              Conéctate, compite y supérate a ti mismo en una experiencia única
              de desarrollo personal.
            </p>
            <div className="flex space-x-4">
              <a
                href="/login"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 5l4 4-4 4" />
                  <path d="M4 14h7" />
                  <path d="M7 10V7l5 3 5-3v3" />
                </svg>
                <span>Jugar Ahora</span>
              </a>
              <a
                href="/ranking"
                className="bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition duration-300 flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="10" y1="13" x2="14" y2="13" />
                  <line x1="12" y1="11" x2="12" y2="15" />
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
                </svg>
                <span>Rankings</span>
              </a>
            </div>
          </div>

          {/* Imagen */}
          <div className="hidden md:flex justify-center items-center">
            <div className="w-full max-w-md aspect-square bg-blue-900/50 rounded-2xl border border-white/10 flex items-center justify-center">
              <span className="text-white/50 text-xl">
                Visualización de Juego
              </span>
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mx-auto mb-4 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 5l4 4-4 4" />
                  <path d="M4 14h7" />
                  <path d="M7 10V7l5 3 5-3v3" />
                </svg>
              ),
              title: "Juegos Variados",
              description:
                "Una amplia selección de desafíos para todos los gustos y niveles.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mx-auto mb-4 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="10" y1="13" x2="14" y2="13" />
                  <line x1="12" y1="11" x2="12" y2="15" />
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H18a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
                </svg>
              ),
              title: "Ranking Global",
              description:
                "Compite con jugadores de todo el mundo y escala posiciones.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mx-auto mb-4 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              ),
              title: "Desarrollo Personal",
              description:
                "Más que juegos, una plataforma para crecer y superarte.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 p-6 rounded-xl border border-white/10 text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
