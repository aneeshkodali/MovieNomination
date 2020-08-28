import React, { useContext } from 'react';
import ButtonContext from '../contexts/ButtonContext';

const SearchHistory = ({ cache }) => {

    // bring in Button attributes
    const context = useContext(ButtonContext);
    const { buttonText, buttonClick, buttonClass } = context;

    const histRendered = Object.keys(cache).map(term => {
        return (
            //<ButtonContext.Consumer>
                <div key={term}>
                            <button onClick={() => {buttonClick(term)}}>Remember Me</button>
                            {/*<button onClick={() => console.log("I'm sad you want to forget me")}>Forget Me</button>*/}
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