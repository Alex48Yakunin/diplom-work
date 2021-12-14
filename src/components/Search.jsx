import React from 'react';
import PropTypes from 'prop-types';

export default function Search({handleChange, handleSubmit, searchText, className}) {
  return (
    <form className={className} onSubmit={handleSubmit}>
      <input className="form-control" placeholder="Поиск" onChange={handleChange} value={searchText}/>
    </form>
  )
}

Search.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  className: PropTypes.string,
}