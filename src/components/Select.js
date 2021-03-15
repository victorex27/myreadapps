import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Select.css';

class Select extends Component {
  render() {
    const { value, bookId, onSelectChange } = this.props;

    return (
      <select onChange={(ev) => onSelectChange(ev, bookId)} value={value}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}

PropTypes.Select = {
  onSelectChange: PropTypes.func,
  booKId: PropTypes.number,
  value: PropTypes.string,
};
export default Select;
