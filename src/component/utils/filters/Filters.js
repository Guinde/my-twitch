import React from 'react';
import { Formik } from 'formik';
import loadable from '@loadable/component'

const _ = require('lodash');

const Period = loadable(() => 
        import(/* webpackChunkName: 'Filter-Period' */'./select/Period')
);
const Sort = loadable(() => 
        import(/* webpackChunkName: 'Filter-Sort' */'./select/Sort')
);
const Type = loadable(() => 
        import(/* webpackChunkName: 'Filter-Type' */'./select/Type')
);
const First = loadable(() => 
        import(/* webpackChunkName: 'Filter-First' */'./select/First')
);

const Filters = ({filters, dataFilters, setNewFilters}) => {

    const initialValues = filters.reduce((accumulator, value) =>
    ({...accumulator, [value]: ''}), {});
    
    let period = false;
    let sort = false;
    let type = false;
    let first = false;

    if(_.includes(filters, "period"))
        period = true;
    if(_.includes(filters, "sort"))
        sort = true;
    if(_.includes(filters, "type"))
        type = true;
    if(_.includes(filters, "first"))
        first = true;
     
    const submit = (values) => {
        const filters = Object.keys(values)
        const newFilters = filters.reduce((accumulator, val) =>
        {
            let filter = values[val] === "" ? dataFilters[val] : values[val];
            return {
                ...accumulator, 
                [val]: filter
            }
        }
        , {});
        setNewFilters(newFilters);
    }

    return(
        <div className="pl-2 mb-5 d-flex flex-row">
            <span className="mr-2">filtrer par :</span>
            <Formik onSubmit={ submit }
                    initialValues={{...initialValues}} >
            { props => (
                <form className="form-inline my-2 my-lg-0 mr-2" onSubmit={ props.handleSubmit }>
                    { period ? (
                        <Period handleChange={ props.handleChange } handleBlur={ props.handleBlur } />) : 
                        ( null ) }
                    { sort ? (
                        <Sort handleChange={ props.handleChange } handleBlur={ props.handleBlur } />
                    ) : ( null )}
                    { type ? (
                        <Type handleChange={ props.handleChange } handleBlur={ props.handleBlur }/>
                    ) : ( null )}
                    { first ? (
                        <First handleChange={ props.handleChange } handleBlur={ props.handleBlur }/>
                    ) : ( null )}
                    <button className="btn btn-sm btn-outline-primary mr-3" 
                            type="submit">
                        Chercher
                    </button>
                    <div className="d-flex">
                        {Object.keys(dataFilters).map((f, i) => (
                            <span key={i} className="align-self-center mr-3 font-weight-bold">{dataFilters[f]}</span>
                        ))}
                    </div>
                </form>
            )}
            </Formik>
        </div>
    )
}

export default Filters;