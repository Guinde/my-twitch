import React from 'react';

const Sort = ({handleChange, handleBlur}) => {

    return(
        <>
            <select className="form-control form-control-sm w-auto mr-2"
                    name="sort"
                    onChange={ handleChange } 
                    onBlur={ handleBlur }
                    defaultValue="">
                <option value="" disabled hidden >Sort</option>
                <option value="time">Time</option>
                <option value="trending">Trending</option>
                <option value="views">Views</option>
            </select>
        </>
    )
}

export default Sort;