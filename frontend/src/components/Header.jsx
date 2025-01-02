import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

function Header() {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (err) {
      console.error("User Not Logged in", err);
    }

  };


  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-teal-600">
            <IoHomeOutline className="text-2xl" />
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-teal-600">
            Products
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-teal-600">
            Cart
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-teal-600">
            Login
          </Link>
          <p onClick={handleLogout} className="text-gray-600 hover:text-teal-600 cursor-pointer">
            Logout
          </p>
        </div>
      </nav>
    </header>
  );
}

export default Header;