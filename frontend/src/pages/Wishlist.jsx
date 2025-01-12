/* eslint-disable no-unused-vars */
import React from "react";

const Wishlist = () => {
  // Placeholder data for wishlist items
  const wishlistItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: "/images/headphones.jpg",
      price: "$99.99",
    },
    {
      id: 2,
      name: "Smart Watch",
      image: "/images/smartwatch.jpg",
      price: "$199.99",
    },
    {
      id: 3,
      name: "Gaming Chair",
      image: "/images/gamingchair.jpg",
      price: "$299.99",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-teal-600 font-bold">{item.price}</p>
            <button className="mt-4 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700">
              Remove from Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
