// UpdateBook.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleBook, updateBook } from '../../../api_calls/bookApis';
import { useNavigate } from 'react-router-dom';
import './UpdateBook.css'; // Import the CSS file

function UpdateBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
  });
  function handleClick () {

    navigate('/check-all-books')
  }
  useEffect(() => {
    fetchSingleBook();
  }, []);

  const fetchSingleBook = async () => {
    try {
      const response = await getSingleBook(id);
      setBook(response.data.book);
      setFormData({
        title: response.data.book.title,
        author: response.data.book.author,
        genre: response.data.book.genre,
        publishedYear: response.data.book.publishedYear,
      });
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateBook(id, formData);
      if (response.status === 200) {
        window.alert('Book updated successfully');
        navigate('/check-all-books');
      }
    } catch (error) {
      window.alert('Error in Updating');
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="container">
      {book && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Title:</label>
            <input
              className="input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="formGroup">
            <label>Author:</label>
            <input
              className="input"
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="formGroup">
            <label>Genre:</label>
            <input
              className="input"
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
            />
          </div>
          <div className="formGroup">
            <label>Published Year:</label>
            <input
              className="input"
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleInputChange}
            />
          </div>
          <div className="formGroup">
            <button className="button" type="submit">
              Update Book
            </button>
            <button className="button" onClick={handleClick}>Check All Books</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UpdateBook;
