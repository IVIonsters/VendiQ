import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to VendiQ</h1>
      <p className="text-xl mb-8">Discover unique handmade items from artisans around the world.</p>
      <Link to="/products" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
        Shop Now
      </Link>
    </div>
  );
}

export default Home;

