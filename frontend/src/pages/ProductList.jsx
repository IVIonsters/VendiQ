import { Link } from 'react-router-dom';

// This would typically come from your Firebase database
const products = [
  { id: 1, name: 'Handmade Pottery', price: 49.99 },
  { id: 2, name: 'Knitted Scarf', price: 29.99 },
  { id: 3, name: 'Wooden Cutting Board', price: 39.99 },
];

function ProductList() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className="border p-4 rounded-md hover:shadow-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
