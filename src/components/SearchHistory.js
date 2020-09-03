import React from 'react';
import Button from './Button';
import './SearchHistory.css';

const SearchHistory = ({ cache, retrieveHistory, removeHistory }) => {

    const histRendered = cache.map(searchTermObj => {
        const { term } = searchTermObj;
        return (
                <li key={term} style={{marginBottom:"5px"}}>
                    <div className="ui buttons" style={{marginRight:"10px"}}>
                        <Button
                            //buttonText="Remember"
                            buttonText={<i className="redo icon" />}

                            buttonClick={() => retrieveHistory(searchTermObj)}
                            buttonClass="ui positive icon button"
                        />
                        {/*<div className="or"></div>*/}
                        <Button
                            //buttonText="Forget"
                            buttonText={<i className="close icon" />}
                            buttonClick={() => removeHistory(searchTermObj)}
                            buttonClass="ui negative icon button"
                        />
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