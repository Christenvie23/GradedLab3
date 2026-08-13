import React, { useState, useEffect } from "react";
import Styles from "./Styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProducts(products);
  };

  const content = loading ? (
    <p className="message">Loading...</p>
  ) : error ? (
    <div className="message">
      <p>Failed to load products.</p>
      <button onClick={() => window.location.reload()} className="clear-btn">
        Retry
      </button>
    </div>
  ) : filteredProducts.length === 0 ? (
    <p className="message">No products found.</p>
  ) : (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>
          <p className="product-category">{product.category}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="page">
      <h1 className="heading">Product Catalog</h1>

      <div className="search-row">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />

        {searchQuery && (
          <button onClick={clearSearch} className="clear-btn">
            Clear
          </button>
        )}
      </div>

      {content}
    </div>
  );
}

export default App;