/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import necessary Firestore utilities
import { db } from "../firebase/firebase"; // Import Firestore instance
import { IoChevronDownOutline } from "react-icons/io5"; // Import dropdown icon

function Products() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All"); // Default category is "All"
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [loading, setLoading] = useState(true); // Loading state
  const [sortOption, setSortOption] = useState("default"); // Add sort state
  const [showSortDropdown, setShowSortDropdown] = useState(false); // Dropdown toggle

  // Extract search query param from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchFromURL = queryParams.get("search");

    if (searchFromURL) {
      setSearchTerm(searchFromURL);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);

  // Remove the handleSearchChange function since we're removing the search input

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

        // Enhanced search filtering - checks both name and category
        if (searchTerm.trim() !== "") {
          const searchLower = searchTerm.toLowerCase();
          productList = productList.filter((product) =>
            product.name.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower)
          );
        }

        // Apply sorting based on selected option
        switch (sortOption) {
          case "price-low-high":
            productList.sort((a, b) => a.price - b.price);
            break;
          case "price-high-low":
            productList.sort((a, b) => b.price - a.price);
            break;
          default:
            // Default sorting (could be by date added or featured)
            break;
        }

        setProducts(productList); // Update state with the filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProducts();
  }, [category, searchTerm, sortOption]); // Re-run the effect when category, searchTerm, or sortOption changes

  // Click handler for outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSortDropdown && !event.target.closest('.sort-dropdown')) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSortDropdown]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="container mx-auto px-4">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Category and Sort Section */}
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
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

        {/* Sort Dropdown */}
        <div className="relative sort-dropdown">
          <button
            className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <span className="mr-1">Sort by</span>
            <IoChevronDownOutline />
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 border border-gray-200">
              <div
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${sortOption === 'default' ? 'text-teal-700 font-medium' : ''}`}
                onClick={() => {
                  setSortOption('default');
                  setShowSortDropdown(false);
                }}
              >
                Default
              </div>
              <div
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${sortOption === 'price-low-high' ? 'text-teal-700 font-medium' : ''}`}
                onClick={() => {
                  setSortOption('price-low-high');
                  setShowSortDropdown(false);
                }}
              >
                Price: Low to High
              </div>
              <div
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${sortOption === 'price-high-low' ? 'text-teal-700 font-medium' : ''}`}
                onClick={() => {
                  setSortOption('price-high-low');
                  setShowSortDropdown(false);
                }}
              >
                Price: High to Low
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Search Filters - show when there's a search */}
      {searchTerm && (
        <div className="mb-4 flex items-center">
          <span className="text-gray-600 mr-2">Search for:</span>
          <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full flex items-center">
            &quot;{searchTerm}&quot;
            <button
              onClick={() => {
                setSearchTerm("");
                // Remove search from URL without page refresh
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete("search");
                window.history.pushState({}, "", newUrl);
              }}
              className="ml-2 text-teal-800 hover:text-teal-900"
              aria-label="Clear search"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      {/* Active Sort Filter */}
      {sortOption !== 'default' && (
        <div className="mb-4 flex items-center">
          <span className="text-gray-600 mr-2">Sorted by:</span>
          <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full flex items-center">
            {sortOption === 'price-low-high' ? 'Price: Low to High' : 'Price: High to Low'}
            <button
              onClick={() => setSortOption('default')}
              className="ml-2 text-teal-800 hover:text-teal-900"
              aria-label="Clear sorting"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
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

      {/* No results message */}
      {products.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default Products;
