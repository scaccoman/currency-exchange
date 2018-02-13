import React from "react";
import PropTypes from 'prop-types'

const BaseInput = ({inputValue, onInputChange, readOnly}) => {
    return (
        <input type="number"
            min="0"
            max="20"
            value={inputValue}
            onChange={onInputChange}
            readOnly={readOnly}
        />
    );
};

BaseInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool.isRequired
};

BaseInput.defaultProps = {
  value: 0,
  onChange: () => {},
  readOnly: false
};

export default BaseInput;