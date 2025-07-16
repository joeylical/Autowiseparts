// client/src/components/ProductList.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductList() {
  const products = useSelector((state) => state.products);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product) => (
          <li key={product.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <Link to={`/product/${product.id}`}>{product.name}</Link> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;