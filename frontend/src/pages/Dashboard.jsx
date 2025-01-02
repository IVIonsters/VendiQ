/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user] = useAuthState(auth);

  // Mock data for categories and featured products
  const categories = [
    { id: 1, name: "Orders", description: "View your order history" },
    { id: 2, name: "Wishlist", description: "Your saved items" },
    { id: 3, name: "Profile Settings", description: "Manage your account details" },
  ];

  const featuredProducts = [
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
      {/* Welcome Section */}
      <section className="bg-white shadow-md p-6 rounded-lg mb-8">
        <div className="flex items-center">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold">
              Welcome, {user?.displayName || "User"}!
            </h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-teal-600 font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
