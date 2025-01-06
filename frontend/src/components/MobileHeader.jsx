import { Link, useNavigate } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { IoHomeOutline, IoCartOutline } from "react-icons/io5";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

function MobileHeader() {
  // Navigation
  const navigate = useNavigate();

  // Get current user state
  const [user] = useAuthState(auth);

  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (err) {
      console.error("User Not Logged in", err);
    } finally {
      setTimeout(() => {
        navigate("/");
      }, 100); // Delay before navigating for auth state to update
    }
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500"
        >
          VendiQ
        </Link>
        <div className="flex-grow max-w-xl mx-4">
          <form className="relative">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-4 text-gray-600 hover:text-teal-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
        {/* Links */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}><TiThMenuOutline className="text-3xl" /></button>
      </nav>
      {isMenuOpen && (
        <div className="flex items-center justify-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-teal-600">
            <IoHomeOutline className="text-2xl" />
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-teal-600">
            Products
          </Link>
          {user ? (
            <>
              {/* Dashboard Button */}
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-teal-600"
              >
                Dashboard
              </Link>
              {/* Logout Button */}
              <p
                onClick={handleLogout}
                className="text-gray-600 hover:text-teal-600 cursor-pointer"
              >
                Logout
              </p>
            </>
          ) : (
            /* Login Button */
            <Link to="/login" className="text-gray-600 hover:text-teal-600">
              Login
            </Link>
          )}
          <Link to="/cart" className="text-gray-600 hover:text-teal-600">
            <IoCartOutline className="text-2xl" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default MobileHeader;
