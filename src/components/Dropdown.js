import React from 'react';

const Dropdown = ({ options, optionSelected, onSelect }) => {
    const optionsRendered = options.map((option, index) => {
        return (
            <option 
                key={option} 
                value={index}
            >
                {option}
            </option>
        )  
    });

    return (
           <select 
                className="ui dropdown"
                value={optionSelected}
                onChange={(e) => onSelect(e)} 
            >
                {optionsRendered}
            </select>
    );

};

export default Dropdown;