import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login with', email, password);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
          Login
        </button>
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 flex items-center justify-center gap-2 rounded hover:bg-teal-600"
        >
          <FcGoogle />
          Continue With Google..
        </button>

      </form>
    </div>
  );
}

export default Login;