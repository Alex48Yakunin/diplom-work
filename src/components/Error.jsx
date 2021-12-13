import React from "react";
import PropTypes from "prop-types";

export default function Error({ callback }) {
  const handleUpdate = () => callback();

  return (
    <div className="text-center">
      <p>Произошла ошибка!</p>
      <button className="btn btn-outline-primary" onClick={handleUpdate}>
        Обновить
      </button>
    </div>
  );
}

Error.propTypes = {
  callback: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};