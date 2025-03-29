import { Link } from 'react-router-dom';
import { ChevronRight, Users, Trophy, Zap, BarChart } from 'lucide-react';
import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (email && password && username && confirmPassword) {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
      try {
        const response = await fetch('https://localhost:4000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
        if (!response.ok) {
          throw new Error('Error al registrar el usuario');
        }
        console.log('Cuenta creada exitosamente');
        // Con este catch de "error" podemos poner el mensaje que queramos si algo no va bien o redirigirlo a otra pagina
      } catch (error) {
        setError(error);
      }
    } else {
      setError('Por favor, completa todos los campos');
    }
  };

// NO PODRIAMOS PONER UN BOTON PARA REGISTRARSE AUTOMATICAMENTE CON LAS CREDENCIALES DE GOOGLE???

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Crear cuenta
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-gray-300 mb-2">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Escribe tu nombre de usuario"
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-2">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
            />
          </div>
          <br />
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

export default Register;