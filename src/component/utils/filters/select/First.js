import React from 'react';

const First = ({handleChange, handleBlur}) => {

    return(
        <>
            <select className="form-control form-control-sm w-auto mr-2"
                    name="first"
                    onChange={ handleChange } 
                    onBlur={ handleBlur }
                    defaultValue="">
                <option value="" disabled hidden>Total</option>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="80">80</option>
                <option value="100">100</option>
            </select>
        </>
    )
}

export default First;