import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label>
      <input
        style={{verticalAlign: 'middle', marginBottom: '6px'}}
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {' '}{label}
    </label>
  </div>
);

export default Checkbox;