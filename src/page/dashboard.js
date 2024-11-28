import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice"; // Import the addItem action
import Header from "../layout/header";

const Dashboard = () => {
  const [products, setProducts] = useState([]); // State to store all products
  const [search, setSearch] = useState(""); // State for search input
  const [selectedCategories, setSelectedCategories] = useState([]); // Categories filter
  const [priceRange, setPriceRange] = useState([0, 75000]); // Price range filter
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const dispatch = useDispatch(); // Initialize dispatch

  // Fetch products from FakeStore API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category) // Remove category if already selected
        : [...prev, category] // Add category if not selected
    );
  };

  // Filter products dynamically
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Add product to the cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product)); // Dispatch the addItem action with the product as payload
  };

  if (loading) {
    return <p>Loading products...</p>; // Show loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message
  }

  return (
    <div className="dashboard-container">
      <Header />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search By Name"
          id="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <main className="dashboard-content">
        <div className="sidebar">
          <h3>Filters</h3>
          {/* Price Range Filter */}
          <div>
            <label>Price Range:</label>
            <input
              type="range"
              min="0"
              max="75000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
            <p>
              ₹ 0 - ₹ {priceRange[1]}
            </p>
          </div>
          {/* Category Filter */}
          <div>
            <h4>Category</h4>
            <label>
              <input
                type="checkbox"
                value="men's clothing"
                onChange={() => handleCategoryChange("men's clothing")}
              />
              Men’s Clothing
            </label>
            <label>
              <input
                type="checkbox"
                value="women's clothing"
                onChange={() => handleCategoryChange("women's clothing")}
              />
              Women’s Clothing
            </label>
            <label>
              <input
                type="checkbox"
                value="jewelery"
                onChange={() => handleCategoryChange("jewelery")}
              />
              Jewelry
            </label>
            <label>
              <input
                type="checkbox"
                value="electronics"
                onChange={() => handleCategoryChange("electronics")}
              />
              Electronics
            </label>
          </div>
        </div>
        <div className="products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100px", height: "100px", objectFit: "contain" }}
                />
                <h4>{product.title}</h4>
                <p>₹ {product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
              </div>
            ))
          ) : (
            <p>No products found matching your criteria.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
