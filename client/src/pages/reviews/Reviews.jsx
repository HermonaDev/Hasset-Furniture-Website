
import React from 'react';
import { FaStar } from 'react-icons/fa';
import './reviews.scss';
import { ArrowBackIos } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const reviews = [
    { id: 1, rating: 4, reviewer: 'John Doe' , Date: '23/06/2023'},
    { id: 2, rating: 5, reviewer: 'Jane Smith' , Date: '06/07/2023'},
    { id: 3, rating: 3, reviewer: 'Mike Johnson', Date: '18/07/2023' },
    { id: 4, rating: 2, reviewer: 'Sarah Thompson', Date: '27/09/2023' },
  ];

  const calculateAverageRating = () => {
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRatings / reviews.length;
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="star-icon filled" />);
      } else {
        stars.push(<FaStar key={i} className="star-icon" />);
      }
    }
    return stars;
  };

  return (
      <div className="reviews-page">
          <Link to="/product">
              <ArrowBackIos className="arrow" />
          </Link>
          
      <h1>Product Reviews</h1>
      <div className="reviews-summary">
        <p>
          Total Reviews: <span className="review-count">{reviews.length}</span>
        </p>
        <p>
          Average Rating: <span className="average-rating">{calculateAverageRating().toFixed(1)}</span>
        </p>
      </div>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="rating">{renderRatingStars(review.rating)}</div>
            <div className="reviewer">{review.reviewer}</div>
            <div className="date">{review.Date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;