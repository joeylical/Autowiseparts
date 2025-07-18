import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function ReviewForm({ productId, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { getCurrentUsername } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const author = getCurrentUsername();
    try {
      await api.post(`/reviews/${productId}`, { rating, comment, author });
      setRating(5);
      setComment('');
      onReviewSubmitted();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      marginTop: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ marginTop: '0', marginBottom: '15px' }}>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Rating:</label>
          <select 
            value={rating} 
            onChange={(e) => setRating(parseInt(e.target.value, 10))} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Comment:</label>
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
          />
        </div>
        <button 
          type="submit" 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em'
          }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;