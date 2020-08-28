import React, { useContext } from 'react';
import Button from './Button';

const SearchHistory = ({ cache, retrieveHistory, removeHistory }) => {

    const histRendered = cache.map(searchTermObj => {
        const { term } = searchTermObj;
        return (
            <div key={term}>
                <div className="ui buttons">
                    <Button
                        buttonText="Remember"
                        buttonClick={() => retrieveHistory(searchTermObj)}
                        buttonClass="ui positive button"
                    />
                    <div className="or"></div>
                    <Button
                        buttonText="Forget"
                        buttonClick={() => removeHistory(searchTermObj)}
                        buttonClass="ui negative button"
                    />
                </div>
                {term}
            </div>
        )
    });

    return (
        <div>
            {histRendered}
        </div>
    );
};

export default SearchHistory;