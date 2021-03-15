import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Shelve from '../components/Shelve';
import { SHELVE_TITLE } from '../helper';
import './Home.css';

class Home extends Component {
  render() {
    const { books, onSelectChange } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div>
              <Shelve
                title="Currently Reading"
                books={books.filter(
                  (book) =>
                    book.selectedShelve === SHELVE_TITLE.CURRENTLY_READING
                )}
                onSelectChange={onSelectChange}
              />

              <Shelve
                title="Want to Read"
                books={books.filter(
                  (book) => book.selectedShelve === SHELVE_TITLE.WANT_TO_READ
                )}
                onSelectChange={onSelectChange}
              />

              <Shelve
                title="Read"
                books={books.filter(
                  (book) => book.selectedShelve === SHELVE_TITLE.READ
                )}
                onSelectChange={onSelectChange}
              />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

PropTypes.Home = {
  books: PropTypes.array,
  onSelectChange: PropTypes.func,
};
export default Home;
