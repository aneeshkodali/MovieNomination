import React, { useContext } from 'react';
import ButtonContext from '../contexts/ButtonContext';
import Button from './Button';

const SearchHistory = ({ cache }) => {

    // bring in Button attributes
    const context = useContext(ButtonContext);
    const { buttonText, buttonClick, buttonClass } = context;

    const histRendered = Object.keys(cache).map(term => {
        return (
            //<ButtonContext.Consumer>
                <div key={term}>
                    <Button
                        buttonText={buttonText}
                        buttonClick={() => buttonClick(term)}
                    />
                    {term}
                    </div>
            //</ButtonContext.Consumer>
        )
    });

    return (
        <div>
            {histRendered}
        </div>
    );
};

export default SearchHistory;