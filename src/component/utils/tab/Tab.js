import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Style from './Tab.module.scss';

const _ = require('lodash');

const Tab = ({tabs, name, baseUrl}) => {

    const location = useLocation().pathname;
    const path = _.drop(_.split(location, '/'), 3);
    const query = _.last(path);

    const [tabActive, setTabActive] = useState("");
    useEffect(() => {
        if (path.length < 1)
            setTabActive(tabs[0])
        else {
            _.forEach(tabs, tab => {
                if(path === _.lowerCase(tab)) {
                    setTabActive(tab);
                    return;
                }
            })
        }
    }, [path, query, tabs])

    return(
        <div className={`bg-light pt-3 pb-3 ${Style.tab}`}>
            { tabs.map((tab, i) => (
                <div key={i}>
                    <>
                        { i === 0 ? (
                            <NavLink to={`${baseUrl}/${name}`} 
                                    className={ Style.tabItem } 
                                    activeClassName={ Style.activeTab }
                                    onClick={() => setTabActive(tab)}
                                    isActive={() => (tab === tabActive ? true : false)} >
                                <span>{tab}</span> 
                            </NavLink>
                        ) : (
                            <NavLink to={`${baseUrl}/${name}/${_.lowerCase(tab)}`} 
                                    className={ Style.tabItem } 
                                    activeClassName={ Style.activeTab }
                                    onClick={() => setTabActive(tab)}>
                                <span>{tab}</span> 
                            </NavLink>
                        )}
                    </>
                </div>
            ))}
        </div>
    )
}

export default Tab;