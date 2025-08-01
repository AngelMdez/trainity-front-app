import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/users');
  };

  return (
    <form onSubmit={handleLogin} className="p-4 flex flex-col gap-2 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="email"
        className="border p-2"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Entrar
      </button>
    </form>
  );
}
