import React from 'react';

const Button = ({ buttonText, buttonClick, buttonClass,  }) => {
    return (
        <div>
            <button
                className={buttonClass}
                onClick={buttonClick}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default Button;