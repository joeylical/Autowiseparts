import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import { addToCart } from '../store/actions';
import Review from './Review';
import ReviewForm from './ReviewForm';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
      console.log('ProductDetail fetched product:', response.data);
    } catch (err) {
      setError('Failed to fetch product details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      alert(`${product.name} added to cart!`);
      history.goBack();
    }
  };

  const handleReviewSubmitted = () => {
    setLoading(true);
    fetchProduct();
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading product details...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  if (!product) return <div style={{ padding: '20px' }}>Product not found.</div>;

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '400px', height: 'auto', marginBottom: '20px' }} />
      <h2>{product.name}</h2>
      <p style={{ fontSize: '1.2em', color: '#007bff', fontWeight: 'bold' }}>${product.price}</p>
      <p>Rating: {product.reviews && product.reviews.length > 0 ? product.rating.toFixed(2) : '--'}</p>
      <p>Inventory: {product.inventory}</p>
      <p style={{ textAlign: 'center', maxWidth: '600px' }}>{product.description}</p>
      {product.category && <p><strong>Category:</strong> {product.category}</p>}
      
      <button
        onClick={handleAddToCart}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          marginTop: '20px',
        }}
      >
        Add to Cart
      </button>

      <div style={{ marginTop: '40px', width: '100%', maxWidth: '600px' }}>
        <h3>Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map(review => (
            <Review key={review.id} review={review} />
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <ReviewForm productId={id} onReviewSubmitted={handleReviewSubmitted} />
    </div>
  );
}

export default ProductDetail;
