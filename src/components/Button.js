import React from 'react';

const Button = ({ buttonText, buttonClick, buttonClass,  }) => {
    return (
            <button
                className={buttonClass}
                onClick={buttonClick}
            >
                {buttonText}
            </button>
    );
};

export default Button;