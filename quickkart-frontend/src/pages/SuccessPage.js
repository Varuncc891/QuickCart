import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SuccessPage.css';

function SuccessPage() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);

  const [ratings, setRatings] = useState({ delivery: 0, quality: 0, support: 0, experience: 0 });
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (category, rating) => {
    setRatings(prev => ({ ...prev, [category]: rating }));
  };

  const isAllRated = Object.values(ratings).every(r => r > 0);

  const handleSubmit = () => {
    if (isAllRated) {
      setSubmitted(true);
    }
  };

  return (
    <div className="success-page">
      <header className="header">
        <h1>QuickCart</h1>
        <div className="header-buttons">
          <button onClick={() => navigate('/products')}>Continue Shopping</button>
          <button onClick={() => navigate('/')}>Home</button>
        </div>
      </header>

      <div className="success-body">
        <h2>Thank you for shopping with us!</h2>
        <p>We hope you enjoyed the experience. Your order has been placed successfully.</p>
        <p>Please rate your experience below:</p>

        <div className="ratings-section">
          {['delivery', 'quality', 'support', 'experience'].map(category => (
            <div key={category} className="rating-category">
              <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={ratings[category] >= star ? 'star filled' : 'star'}
                  onClick={() => handleRating(category, star)}
                >
                  ★
                </span>
              ))}
            </div>
          ))}
        </div>

        <button
          className={`submit-rating ${isAllRated ? 'active' : ''}`}
          onClick={handleSubmit}
          disabled={!isAllRated}
        >
          Submit Ratings
        </button>

        {submitted && <p className="thank-you">Thanks for rating us! Your feedback is valuable.</p>}
      </div>

      <footer className="footer">
        <p>QuickCart ©</p>
      </footer>
    </div>
  );
}

export default SuccessPage;
