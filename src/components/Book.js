import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import './Book.css';

class Book extends Component {
  render() {
    const {
      id,
      title,
      author,
      shelveValue,
      onSelectChange,
      backgroundImage,
    } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              backgroundImage: 'url("' + backgroundImage + '")',
            }}
          />
          <div className="book-shelf-changer">
            <Select
              onSelectChange={onSelectChange}
              bookId={id}
              value={shelveValue}
            />
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author || ''}</div>
      </div>
    );
  }
}

PropTypes.Book = {
  id: PropTypes.number,
  title: PropTypes.string,
  author: PropTypes.string,
  shelveValue: PropTypes.string,
  backgroundImage: PropTypes.string,
  onSelectChange: PropTypes.func,
};

export default Book;
