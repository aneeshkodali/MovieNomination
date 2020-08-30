import React from 'react';

const Dropdown = ({ options, optionSelected, onSelect }) => {
    const optionsRendered = options.map((option, index) => {
        return <React.Fragment key={option}>
            <option value={index}>{option}</option>
        </React.Fragment>
    });

    return (
        <div>
           <select 
                value={optionSelected}
                onChange={(e) => onSelect(e)} 
                className="ui dropdown">
                {/*<option value="">Categories</option>*/}
                {optionsRendered}
            </select>
        </div>
    );
};

export default Dropdown;