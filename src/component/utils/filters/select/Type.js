import React from 'react';

const Type = ({handleChange, handleBlur}) => {

    return(
        <>
            <select className="form-control form-control-sm w-auto mr-2"
                    name="type"
                    onChange={ handleChange } 
                    onBlur={ handleBlur }
                    defaultValue="">
                <option value="" disabled hidden>Type</option>
                <option value="all">All</option>
                <option value="upload">Upload</option>
                <option value="archive">Archive</option>
                <option value="highlight">Highlight</option>
            </select>
        </>
    )
}

export default Type;