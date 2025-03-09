import { Link, useNavigate } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { IoHomeOutline, IoCartOutline, IoCloseOutline, IoGiftOutline, IoBodyOutline, IoLogOutOutline } from "react-icons/io5";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";

function MobileHeader() {
  // Navigation
  const navigate = useNavigate();

  // Get current user state
  const [user] = useAuthState(auth);

  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (err) {
      console.error("User Not Logged in", err);
    } finally {
      setIsMenuOpen(false);
      setTimeout(() => {
        navigate("/");
      }, 100); // Delay before navigating for auth state to update
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md relative z-50">
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
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          className="focus:outline-none"
        >
          <TiThMenuOutline className="text-3xl" />
        </button>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-xl font-medium text-teal-600">Menu</span>
          <button onClick={closeMenu} aria-label="Close menu">
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-700 hover:text-teal-600"
            onClick={closeMenu}
          >
            <IoHomeOutline className="text-xl" />
            <span>Home</span>
          </Link>

          <Link
            to="/products"
            className="flex items-center space-x-2 text-gray-700 hover:text-teal-600"
            onClick={closeMenu}
          >
            <IoGiftOutline className="text-xl" />
            <span>Products</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center space-x-2 text-gray-700 hover:text-teal-600"
            onClick={closeMenu}
          >
            <IoCartOutline className="text-xl" />
            <span>Cart</span>
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-teal-600"
                onClick={closeMenu}
              >
                <IoBodyOutline className="text-xl" />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 text-left"
              >
                <IoLogOutOutline className="text-xl" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 text-gray-700 hover:text-teal-600"
              onClick={closeMenu}
            >
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
