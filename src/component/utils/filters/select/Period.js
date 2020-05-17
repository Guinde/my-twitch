import React from 'react';

const Period = ({handleChange, handleBlur}) => {

    return(
        <>
            <select className="form-control form-control-sm w-auto mr-2"
                    name="period"
                    onChange={ handleChange } 
                    onBlur={ handleBlur }
                    defaultValue="">
                <option value="" disabled hidden>Period</option>
                <option value="all">All</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
             </select>
        </>
    )
}

export default Period;