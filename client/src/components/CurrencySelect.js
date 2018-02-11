import React from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const BaseInput = (props) => {
    
    return (
      <div className="select-wrapper">
        <Select
          style={{cursor: "pointer"}}
          name="CurrencySelector"
          autosize={true}
          clearable={false}
          arrowRenderer={null}
          value={props.selected}
          onChange={props.onChange}
          options={props.currencies}
        />
      </div>
    );
};

export default BaseInput;