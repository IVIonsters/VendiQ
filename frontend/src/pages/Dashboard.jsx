/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProfileSettingsModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Profile Settings</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          <input
            type="text"
            placeholder="Display Name"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          >
            Save
          </button>
        </form>
        <button
          className="mt-4 w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isListingFormOpen, setListingFormOpen] = useState(false);

  const categories = [
    { id: 1, name: "Orders", description: "View your order history" },
    { id: 2, name: "Wishlist", description: "Your saved items" },
    { id: 3, name: "Profile Settings", description: "Manage your account details" },
    { id: 4, name: "List An Item", description: "Want to sell? Add your item here!" },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition cursor-pointer"
              onClick={() => {
                if (category.name === "Orders") navigate("/orders");
                if (category.name === "Wishlist") navigate("/wishlist");
                if (category.name === "Profile Settings") setProfileModalOpen(true);
                if (category.name === "List An Item") setListingFormOpen(!isListingFormOpen);
              }}
            >
              <h3 className="text-lg font-bold">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* List An Item Form */}
      {isListingFormOpen && (
        <form
          className="bg-white shadow-md p-6 rounded-lg mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission logic here
            console.log("Item listed!");
            setListingFormOpen(false);
          }}
        >
          <h2 className="text-lg font-bold mb-4">List Your Item</h2>
          <input
            type="text"
            placeholder="Item Name"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
          >
            Submit
          </button>
        </form>
      )}

      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSave={() => {
          console.log("Profile updated!");
          setProfileModalOpen(false);
        }}
      />

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
