import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";



function SignUp() {
  const [email, setEmail] = useState(""); // Stores the email entered by the user
  const [password, setPassword] = useState(""); // Stores the password entered by the user
  const [fname, setFname] = useState(""); // Stores the first name entered by the user
  const [lname, setLname] = useState(""); // Stores the last name entered by the user
  const [error, setError] = useState(""); // Stores error messages
  const [success, setSuccess] = useState(""); // Stores success messages

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: fname,
        lastName: lname,
        email: email,
        createdAt: new Date(),
      });

      setSuccess("Account created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label htmlFor="fname" className="block mb-1">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="lname" className="block mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
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
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-700"
        >
          Sign Up
        </button>
        <p>
          Already Registered?{" "}
          <Link to="/login" className="text-teal-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;