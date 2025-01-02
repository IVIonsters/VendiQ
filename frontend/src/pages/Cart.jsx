const cartItems = [
  { id: 1, name: 'Handmade Pottery', price: 49.99, quantity: 1 },
  { id: 2, name: 'Knitted Scarf', price: 29.99, quantity: 2 },
];

function Cart() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4 bg-white p-4 rounded-md shadow">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
          </div>
          <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="text-xl font-bold mt-8 text-right">
        Total: ${total.toFixed(2)}
      </div>
      <button className="mt-4 bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 w-full">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;

