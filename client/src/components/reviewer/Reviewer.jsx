import React, { useState } from "react";

const Reviewer = ({ productId, submitRating }) => {
  const [rating, setRating] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;
    submitRating(productId, rating);
    setRating(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Rate this product:</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="">Select...</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <button type="submit" disabled={!rating}>
        Submit Rating
      </button>
    </form>
  );
};

export default Reviewer;