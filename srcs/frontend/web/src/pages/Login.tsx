import { Link } from 'react-router-dom';
import { ChevronRight, Users, Trophy, Zap, BarChart } from 'lucide-react';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email && password) {
      setError('');
      console.log('Iniciando sesión...');
      // Aquí iría la lógica de autenticación
    } else {
      setError('Por favor, ingresa tu correo y contraseña');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Iniciando sesión con Google...');
    try {
        // Redirect the user to the Google OAuth login page
        window.location.href = 'https://localhost:4000/api/oauth';
    } catch (error) {
        console.error('Redirect error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Iniciar sesión
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Formulario de login */}
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
            <label htmlFor="password" className="block text-sm text-gray-300 mb-2">
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

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-indigo-400 text-sm hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Iniciar sesión
          </button>
        </div>

        {/* Botón de login con Google (usando el ícono Zap como representante) */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2 focus:outline-none"
          >
            <Zap size={20} /> Iniciar sesión con Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-400 text-sm">¿No tienes cuenta? </span>
          <Link to="/register" className="text-indigo-400 text-sm hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
