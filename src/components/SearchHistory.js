import React from 'react';
import './SearchHistory.css';

const SearchHistory = ({ cache, retrieveHistory, removeHistory }) => {

    const histRendered = cache.map(searchTermObj => {
        const { term } = searchTermObj;
        return (
                <li key={term} style={{marginBottom:"5px"}}>
                    <div className="ui buttons" style={{marginRight:"10px"}}>
                        <button
                            onClick={() => retrieveHistory(searchTermObj)}
                            className="ui mini positive icon button"
                        >
                            <i className="redo icon" />
                        </button>
                        {/*<div className="or"></div>*/}
                        <button
                            onClick={() => removeHistory(searchTermObj)}
                            className="ui mini negative icon button"
                        >
                            <i className="close icon" />
                        </button>
                    </div>
                    "{term}"
                </li>
        )
    });

    return (
        <div>
            {histRendered}
        </div>
    );
};

export default SearchHistory;