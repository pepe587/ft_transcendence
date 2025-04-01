import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    if (email && password) {
      try {
        const response = await fetch("/api/oauth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email, password }),
        });

        if (response.ok) {
          setSuccess("Usuario registrado exitosamente");
          setError("");
        } else {
          const data = await response.json();
          setError(data.error || "Error al registrar el usuario");
          setSuccess("");
        }
      } catch (error) {
        setError("Error al conectar con el servidor");
        setSuccess("");
      }
    } else {
      setError("Por favor, completa todos los campos");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Registro de Usuario
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && (
          <div className="text-green-500 text-center mb-4">{success}</div>
        )}

        <div className="space-y-4">

          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escribe tu correo"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Escribe tu contraseña"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Registrarse
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-400 text-sm">¿Ya tienes cuenta? </span>
          <Link to="/login" className="text-indigo-400 text-sm hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;