import React, { createRef } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import logoTwitch from "../../icon/twitchIcon.svg";
import Style from "./Header.module.scss";

const _ = require('lodash');

const Header = ({history}) => {

    const inputSearch = createRef();
    const initialValues = {search: '', category: 'game' }

    const submit = (values, actions) => {
        console.log("values =>", values)
        const val = _.join(_.split(values.search, " "), "%20")
        inputSearch.current.value = '';
        if(actions){
            actions.resetForm(initialValues);
        }
        history.push(`/${values.category}/${val}`)
    }

    return(
        <nav className={`navbar navbar-expand-lg navbar-dark topNav ${Style.topNav}`}>
            <NavLink to="/" className="navbar-brand mr-2" activeClassName="active">
                <img src={logoTwitch} alt="logo twitch"/>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/top-games" className="nav-link">Top Games</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/top-streams" className="nav-link mr-2">Top Streams</NavLink>
                    </li>
                </ul>
                <Formik onSubmit={ submit }
                        initialValues={ initialValues }>
                    { props => ( 
                        <form className="form-inline my-2 my-lg-0" onSubmit={ props.handleSubmit }>
                            <input className="form-control mr-sm-2"
                                   ref={ inputSearch }
                                   name="search" 
                                   type="search" 
                                   placeholder="Recherche" 
                                   aria-label="Search" 
                                   onChange={ props.handleChange } 
                                   onBlur={ props.handleBlur } />
                            <select className="mr-2 form-control" 
                                    name="category"
                                    onChange={ props.handleChange } 
                                    onBlur={ props.handleBlur }>
                                <option value="game">Jeu</option>
                                <option value="stream">Stream</option>
                            </select>
                            <button className="btn btn-outline-light my-2 my-sm-0" 
                                    type="submit"
                                    disabled={ props.isSubmitting || props.values.search === '' }
                                    onClick={ submit }
                                    >
                                Search
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
      </nav>
    )
}

export default withRouter(Header);