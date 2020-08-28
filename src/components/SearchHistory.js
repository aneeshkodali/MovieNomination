import React from 'react';

const SearchHistory = ({ cache }) => {

    const histRendered = Object.keys(cache).map(key => {
        return <div key={key}>
                    <button onClick={() => console.log(cache[key])}>Remember Me</button>
                    <button onClick={() => console.log("I'm sad you want to forget me")}>Forget Me</button>
                    {key}
            </div>
    });

    return (
        <div>
            {histRendered}
        </div>
    );
};

export default SearchHistory;