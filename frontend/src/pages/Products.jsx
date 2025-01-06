/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Import Firestore instance

function Products() {
  // State to store the list of products fetched from Firestore
  const [products, setProducts] = useState([]);

  // State to manage loading state during the fetch process
  const [loading, setLoading] = useState(true);

  // Fetch products from Firestore when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all documents in the "products" collection
        const querySnapshot = await getDocs(collection(db, "products"));

        // Map through the documents to create an array of product objects
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID for linking
          ...doc.data(), // Spread the rest of the fields (name, price, imageURL, etc.)
        }));

        // Update the state with the fetched products
        setProducts(productList);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching products:", error);
      } finally {
        // Stop the loading state once fetching is complete
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  // Display a loading message while the products are being fetched
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Render the products once they are fetched
  return (
    <div>
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Grid Container for Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          // Link each product to its detail page using its Firestore document ID
          <Link
            key={product.id}
            to={`/products/${product.id}`} // Dynamic link for the product
            className="border p-4 rounded-md hover:shadow-lg"
          >
            {/* Product Image */}
            <img
              src={product.imageURL} // Image URL from Firestore
              alt={product.name} // Alt text for accessibility
              className="w-96 h-96 object-cover mb-4" // Image styling
            />

            {/* Product Name */}
            <h2 className="text-xl font-semibold">{product.name}</h2>

            {/* Product Price */}
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
