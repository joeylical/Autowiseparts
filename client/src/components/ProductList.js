import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import api from '../services/api';
import SearchBar from './SearchBar';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const location = useLocation();
  const history = useHistory();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(location.search);
      const q = params.get('q') || '';
      const category = params.get('category') || '';
      const minPriceParam = params.get('minPrice') || '';
      const maxPriceParam = params.get('maxPrice') || '';

      setSelectedCategory(category);
      setMinPrice(minPriceParam);
      setMaxPrice(maxPriceParam);

      const response = await api.get('/products', {
        params: { q, category, minPrice: minPriceParam, maxPrice: maxPriceParam },
      });
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location.search]);

  // Fetch categories (simulated for now, ideally from backend)
  useEffect(() => {
    // In a real application, you would fetch categories from your backend
    setCategories(['Engine Parts', 'Brake System', 'Lighting', 'Electrical', 'Exterior', 'Suspension', 'Fuel System']);
  }, []);

  const handleSearch = (searchTerm) => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    history.push({ search: params.toString() });
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    const params = new URLSearchParams(location.search);
    if (newCategory) {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    history.push({ search: params.toString() });
  };

  const handlePriceChange = () => {
    const params = new URLSearchParams(location.search);
    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }
    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }
    history.push({ search: params.toString() });
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading products...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/cart" style={{ float: 'right', marginBottom: '20px', padding: '10px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>View Cart</Link>
      <h2>Products</h2>
      <SearchBar onSearch={handleSearch} initialSearchTerm={new URLSearchParams(location.search).get('q') || ''} />

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <select onChange={handleCategoryChange} value={selectedCategory} style={{ padding: '8px' }}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ padding: '8px', width: '100px' }}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: '8px', width: '100px' }}
        />
        <button onClick={handlePriceChange} style={{ padding: '8px 15px', cursor: 'pointer' }}>Apply Price Filter</button>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((product) => (
            <li key={product.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0', display: 'flex', alignItems: 'center' }}>
              <img src={product.imageUrl} alt={product.name} style={{ width: '80px', height: '80px', marginRight: '15px', objectFit: 'cover' }} />
              <div>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>{product.name}</Link>
                <p style={{ margin: '5px 0' }}>${product.price}</p>
                <p style={{ fontSize: '0.9em', color: '#555' }}>{product.description.substring(0, 100)}...</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
