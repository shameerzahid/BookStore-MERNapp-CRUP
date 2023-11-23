// AllBooks.js

import React, { useState, useEffect } from 'react';
import { getAllBook, deleteBook } from '../../../api_calls/bookApis';
import { useNavigate } from 'react-router-dom';
import './AllBooks.css'; // Import the CSS file

function AllBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getAllBook();
      setBooks(response.data.books);
      // Set filteredBooks initially to be the same as books
      setFilteredBooks(response.data.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteBook(id);
      if (response.status === 200) {
        window.alert('Book deleted successfully');
        fetchBooks();
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      window.alert('Error in Deleting');
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the books based on the search query
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );

    // Update the state only for the filteredBooks, not the original books
    setFilteredBooks(filteredBooks);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
       <div className="header">
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearch}
      />
      <button className="button" onClick={() => navigate('/add-book')}>
        Move to Add Book
      </button>
    </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Published Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book, index) => (
            <tr key={book.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.publishedYear}</td>
              <td>
                <button onClick={() => { navigate(`/books/${book._id}`) }}>
                  View
                </button>
                <button onClick={() => {navigate(`/update/${book._id}`)}}>
                  Edit
                </button>
                <button onClick={() => handleDelete(book._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          {'<'}
        </button>
        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredBooks.length / booksPerPage)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default AllBooks;
