import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="h-[85vh] bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 flex items-center justify-center p-4 rounded-3xl">
      <div className="max-w-3xl w-full backdrop-blur-lg bg-white bg-opacity-10 p-6 rounded-2xl shadow-2xl border border-white border-opacity-20">
        <h1 className="text-4xl font-extrabold mb-4 text-white text-center">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">VendiQ</span>
        </h1>
        <p className="text-lg mb-6 text-white text-center">
          Discover unique handmade items from artisans around the world.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Link
            to="/products"
            className="px-6 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Shop Now
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Join Us
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Handcrafted', 'Unique', 'Sustainable'].map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-10 p-3 rounded-xl backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-1 text-white">{feature}</h2>
              <p className="text-white text-opacity-80 text-sm">
                Our products are {feature.toLowerCase()} and made with care.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;