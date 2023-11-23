// ViewBook.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBook } from '../../../api_calls/bookApis';
import './ViewBook.css';
import { useNavigate } from 'react-router-dom';

function ViewBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchSingleBook();
  }, []);

  function handleClick () {

    navigate('/check-all-books')
  }

  const fetchSingleBook = async () => {
    try {
      const response = await getSingleBook(id);
      setBook(response.data.book);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  return (
    <div className="container">
      {book && (
        <div className="bookContainer">
          <h2 className="textCenter">{book.title}</h2>
          <p className="textCenter">Author: {book.author}</p>
          <p className="textCenter">Genre: {book.genre}</p>
          <p className="textCenter">Published Year: {book.publishedYear}</p>
          <button className="button" onClick={handleClick}>Check All Books</button>
        </div>
      )}
    </div>
  );
}

export default ViewBook;
