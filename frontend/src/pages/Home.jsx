import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Handmade Vase', price: 29.99, image: 'https://images.unsplash.com/photo-1460461499329-f6b87a045649?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Eco Tote Bag', price: 19.99, image: 'https://images.unsplash.com/photo-1464634902409-3e1aac812c24?q=80&w=1366&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Artisan Necklace', price: 49.99, image: 'https://images.unsplash.com/photo-1707222611620-41c17060c4de?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Decorative Plate', price: 34.99, image: 'https://images.unsplash.com/photo-1584990968119-16fbde0164b6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Welcome to{' '}
          <span className="text-teal-600">VendiQ</span>
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Explore unique, handmade items from around the globe.
        </p>
        <div className="flex justify-center mt-4">
          <Link
            to="/products"
            className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow hover:bg-teal-600 transition"
          >
            Shop Now
          </Link>
          <Link
            to="/SignUp"
            className="ml-4 px-6 py-2 bg-white border border-teal-500 text-teal-500 font-semibold rounded-lg shadow hover:bg-teal-50 transition"
          >
            Join Us
          </Link>
        </div>
      </header>

      {/* Featured Products */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-teal-600 font-bold">${product.price}</p>
              <button className="mt-2 w-full py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition">
                View Product
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Home Decor', 'Jewelry', 'Clothing', 'Toys'].map((category, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {category}
              </h3>
              <p className="text-gray-600">Explore now</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-teal-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Join our Community
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Sign up to discover amazing products and connect with creators.
        </p>
        <div className="flex justify-center">
          <Link
            to="/signup"
            className="px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow hover:bg-teal-600 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
