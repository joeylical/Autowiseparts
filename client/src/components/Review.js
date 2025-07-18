import React from 'react';

function Review({ review }) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      padding: '15px', 
      marginBottom: '15px',
      backgroundColor: '#f9f9f9'
    }}>
      <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{review.author}</p>
      <p style={{ margin: '0 0 10px 0', color: '#555' }}>Rating: {review.rating}</p>
      <p style={{ margin: '0' }}>{review.comment}</p>
    </div>
  );
}

export default Review;