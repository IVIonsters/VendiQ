import { useParams } from 'react-router-dom';

const products = [
  { id: '1', name: 'Handmade Pottery', price: 49.99, description: 'Beautiful handcrafted pottery.', image: '/placeholder.svg?height=400&width=400' },
  { id: '2', name: 'Knitted Scarf', price: 29.99, description: 'Warm and cozy knitted scarf.', image: '/placeholder.svg?height=400&width=400' },
  { id: '3', name: 'Wooden Cutting Board', price: 39.99, description: 'Durable wooden cutting board.', image: '/placeholder.svg?height=400&width=400' },
];

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
        <p className="mb-4">{product.description}</p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;