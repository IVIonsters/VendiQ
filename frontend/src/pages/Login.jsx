/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const userCredential = signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!", userCredential);
    } catch (err) {
      setError(err.message);
    }
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
        <p>
          No account? No problem!{" "}
          <Link to="/signup" className="text-teal-500 hover:underline font-bold">
            Sign Up Here
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;