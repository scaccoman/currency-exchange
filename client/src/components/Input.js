import React from "react";

const BaseInput = (props) => {
    return (
        <input type="number"
            min="0"
            max="20"
            value={props.inputValue}
            onChange={props.onInputChange}
        />
    );
};

export default BaseInput;