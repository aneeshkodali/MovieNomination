import React from 'react';

const Dropdown = () => {
    return (
        <div>
           <select className="ui dropdown">
                <option value="">Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
            </select>
            <i className="plus square icon"></i>
        </div>
    );
};

export default Dropdown;