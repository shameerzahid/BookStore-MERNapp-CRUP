// MainPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; // Import the CSS file

function MainPage() {
  const navigate = useNavigate();

  function handlePublish() {
    navigate('/add-book');
  }

  function handleBooks() {
    navigate('/check-all-books');
  }

  return (
    <div className="container">
      <div className="book">
        <div className="cover">
          <div>
            <button className="button" onClick={handlePublish}>
              Add a Book
            </button>
          </div>
          <div>
            <button className="button" onClick={handleBooks}>
              Check All Books
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
