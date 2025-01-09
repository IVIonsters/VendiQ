/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import necessary Firestore utilities
import { db } from "../firebase/firebase"; // Import Firestore instance

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All"); // Default category is "All"
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading state

      try {
        // Initialize Firestore query
        let queryRef = collection(db, "products");

        // Apply category filter
        if (category !== "All") {
          queryRef = query(queryRef, where("category", "==", category));
        }

        // Fetch products from Firestore
        const querySnapshot = await getDocs(queryRef);
        let productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Apply search term filter (client-side filtering)
        if (searchTerm.trim() !== "") {
          productList = productList.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setProducts(productList); // Update state with the filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProducts();
  }, [category, searchTerm]); // Re-run the effect when category or searchTerm changes

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="container mx-auto px-4">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Category Selector */}
      <div className="mb-6 flex items-center space-x-4">
        <button
          onClick={() => setCategory("All")}
          className={`px-4 py-2 rounded-md ${category === "All" ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
        >
          All
        </button>
        <button
          onClick={() => setCategory("Tech Gadgets")}
          className={`px-4 py-2 rounded-md ${category === "Tech Gadgets" ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
        >
          Tech Gadgets
        </button>
        <button
          onClick={() => setCategory("Home Decor")}
          className={`px-4 py-2 rounded-md ${category === "Home Decor" ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
        >
          Home Decor
        </button>
        <button
          onClick={() => setCategory("Jewelry")}
          className={`px-4 py-2 rounded-md ${category === "Jewelry" ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
        >
          Jewelry
        </button>
        <button
          onClick={() => setCategory("Art")}
          className={`px-4 py-2 rounded-md ${category === "Art" ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
        >
          Art
        </button>
        <button
          onClick={() => setCategory("Books")}
          className={`px-4 py-2 rounded-md ${category === "Books" ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
        >
          Books
        </button>
        <button
          onClick={() => setCategory("Food & Drink")}
          className={`px-4 py-2 rounded-md ${category === "Food & Drink" ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
        >
          Food & Drink
        </button>
        <button
          onClick={() => setCategory("Clothing")}
          className={`px-4 py-2 rounded-md ${category === "Clothing" ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
        >
          Clothing
        </button>
        <button
          onClick={() => setCategory("Toys & Games")}
          className={`px-4 py-2 rounded-md ${category === "Toys & Games" ? "bg-teal-600 text-white" : "bg-gray-200"
            }`}
        >
          Toys & Games
        </button>


      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="border p-4 rounded-md hover:shadow-lg"
          >
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
