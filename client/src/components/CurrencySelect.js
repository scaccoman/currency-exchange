import React from "react";
import PropTypes from 'prop-types'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const CurrencySelect = ({selected, onChange, currencies}) => {
    
    return (
      <div className="select-wrapper">
        <Select
          style={{cursor: "pointer"}}
          name="CurrencySelector"
          autosize={true}
          clearable={false}
          arrowRenderer={null}
          value={selected}
          onChange={onChange}
          options={currencies}
        />
      </div>
    );
};

CurrencySelect.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

CurrencySelect.defaultProps = {
  value: 0,
  onChange: () => {},
  options: []
};

export default CurrencySelect;