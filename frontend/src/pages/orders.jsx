/* eslint-disable no-unused-vars */
import React from "react";

const Orders = () => {
  // Placeholder data for orders
  const orders = [
    {
      id: 1,
      date: "2025-01-01",
      total: "$99.99",
      items: 3,
    },
    {
      id: 2,
      date: "2025-01-15",
      total: "$199.99",
      items: 2,
    },
    {
      id: 3,
      date: "2025-01-20",
      total: "$49.99",
      items: 1,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold mb-2">Order #{order.id}</h2>
            <p className="text-gray-600">Date: {order.date}</p>
            <p className="text-gray-600">Total: {order.total}</p>
            <p className="text-gray-600">Items: {order.items}</p>
            <button className="mt-4 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
