// client/src/components/Review.js
import React, { useState } from 'react';
import api from '../services/api';

function Review() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', { rating, comment });
      setRating(5);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default Review;