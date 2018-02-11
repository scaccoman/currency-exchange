import React from "react";

const BaseInput = (props) => {
    return (
        <input type="number" 
            value={props.inputValue}
            onChange={props.onInputChange}
        />
    );
};

export default BaseInput;