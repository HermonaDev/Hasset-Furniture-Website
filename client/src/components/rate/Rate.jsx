import React, { useState } from 'react';
import "./rate.scss"
const Rate = () => {
 const [rating, setRating] = useState(0);

 const handleRating = (value) => {
    setRating(value);
 };

 return (
    <div className='rate-sec'>
      <h2>Rating Section</h2>
      <div className="sec">
        {[...Array(5)].map((star, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleRating(i + 1)}
            style={{ backgroundColor: i < rating ? 'gold' : 'white' }}
          >
            &#9733;
          </button>
        ))}
      </div>
         <p>You rated this product {rating} stars</p>
    </div>
 );
};

export default Rate;