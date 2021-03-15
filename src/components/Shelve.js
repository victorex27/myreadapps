import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import './Shelve.css';

class Shelve extends Component {
  render() {
    const { books, onSelectChange } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(
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
    );
  }
}

PropTypes.Shelve = {
  title: PropTypes.string,
  books: PropTypes.array,
  onSelectChange: PropTypes.func,
};
export default Shelve;
