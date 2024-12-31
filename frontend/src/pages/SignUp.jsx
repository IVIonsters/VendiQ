import { useState } from 'react';
import { Link } from 'react-router-dom';


function SignUp() {
  const [email, setEmail] = useState(""); // Stores the email entered by the user
  const [password, setPassword] = useState(""); // Stores the password entered by the user
  const [fname, setFname] = useState(""); // Stores the first name entered by the user
  const [lname, setLname] = useState(""); // Stores the last name entered by the user



  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">First Name</label>
          <input
            type="email"
            id="email"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Last Name</label>
          <input
            type="email"
            id="email"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
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
        <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded hover:bg-indigo-700">
          Sign Up
        </button>
        <p>
          Already Registered? <Link to="/login" className="text-teal-500 hover:underline">Login</Link>
        </p>


      </form>
    </div>
  );
}

export default SignUp;