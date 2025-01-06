import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully!", userCredential.user);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Reset loading to false
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });

      // Redirect to dashboard
      navigate("/dashboard");

      console.log("Google user logged in and saved:", user);
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
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
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-teal-500 hover:bg-teal-600"
            }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className={`w-full bg-white text-gray-700 py-2 flex items-center justify-center gap-2 border rounded ${loading && "cursor-not-allowed opacity-50"
            }`}
          disabled={loading}
        >
          <FcGoogle />
          {loading ? "Processing..." : "Continue With Google"}
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
