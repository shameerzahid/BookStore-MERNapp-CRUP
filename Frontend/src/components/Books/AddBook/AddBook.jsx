// AddBook.js
import React, { useState } from 'react';
import { createBook } from '../../../api_calls/bookApis';
import { useNavigate } from 'react-router-dom';
import './AddBook.css'; // Import the CSS file

function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.author || !formData.genre || !formData.publishedYear) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(formData.publishedYear)) {
      setError('Published year must be a number.');
      return;
    }

    await createBook(formData)
      .then((response) => {
        if (response.status === 200) {
          setFormData({
            title: '',
            author: '',
            genre: '',
            publishedYear: '',
          });
          window.alert('Book added successfully!');

          navigate('/check-all-books');
        }
      })
      .catch((error) => {
        window.alert('Error could not submit!');
      });
  };

  return (
    <div className="container">
      <button className="button" onClick={()=>navigate('/')}>Main Page</button>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className="formGroup">
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleInputChange} />
        </div>
        <div className="formGroup">
          <label>Genre:</label>
          <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} />
        </div>
        <div className="formGroup">
          <label>Published Year:</label>
          <input
            type="Number"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleInputChange}
          />
        </div>
        <div className="formGroup">
          <button type="submit">Add Book</button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default AddBook;
