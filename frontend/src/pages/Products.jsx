import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Handmade Pottery', price: 49.99, image: 'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?q=80&w=1280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Knitted Scarf', price: 29.99, image: 'https://images.unsplash.com/photo-1457545195570-67f207084966?q=80&w=1492&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Wooden Cutting Board', price: 39.99, image: 'https://images.unsplash.com/photo-1666013942797-9daa4b8b3b4f?q=80&w=1367&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Beaded Necklace', price: 19.99, image: 'https://images.unsplash.com/photo-1669148595247-5e6cc19cbca6?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, name: 'Leather Wallet', price: 59.99, image: 'https://images.unsplash.com/photo-1582126486298-9d5194a50d82?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, name: 'Ceramic Mug', price: 14.99, image: 'https://images.unsplash.com/photo-1654682517264-b7bd4a61f136?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

function Products() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`} className="border-2 border-gray-300 p-4 rounded-md hover:shadow-lg">
            <img src={product.image} alt={product.name} className="w-96 h-96 object-cover mb-4 items-" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;