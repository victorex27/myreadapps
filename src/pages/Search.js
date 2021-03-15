import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from '../components/Book';

import './Search.css';

class Search extends Component {
  render() {
    const { onSelectChange, onSearchChange, item, searchBooks } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={item}
              onChange={onSearchChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div className="bookshelf">
            <div className="bookshelf-books">
              <ol className="books-grid">
                {searchBooks.map(
                  ({ id, title, author, selectedShelve, backgroundImage }) => (
                    <li key={id}>
                      <Book
                        id={id}
                        title={title}
                        author={author}
                        shelveValue={selectedShelve}
                        backgroundImage={backgroundImage}
                        onSelectChange={onSelectChange}
                      />
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PropTypes.Search = {
  onSelectChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  item: PropTypes.string,
  searchBooks: PropTypes.array,
};
export default Search;
