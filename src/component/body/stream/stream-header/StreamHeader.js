import React from 'react';
import { Link } from 'react-router-dom';
import Tab from '../../../utils/tab/Tab';
import Style from './StreamHeader.module.scss'

const StreamHeader = ({stream, login}) => {

    const tabs = ['Live','Videos', 'Clips'];

    return(
        <>
            { stream ? (
                <div className="d-flex flex-row sticky-top bg-light">
                    <div className={Style.headerStream}>
                        <Link className="align-self-center mr-3" 
                            to={{pathname: `/stream/${ stream.login }`}}>
                            <img src={stream.profile_image_url} 
                                width="40"
                                height="40" 
                                alt="profile" 
                                className="rounded-circle" />
                        </Link>
                        <div className="flex-row">
                            <Link className={`align-self-center ${Style.userName}`} 
                                  to={{ pathname: `/stream/${ stream.login }`}}>
                                <span >{ stream.user_name }</span>
                            </Link>
                            <span className={`align-self-center text-white rounded pl-2 pr-2 text-uppercase ${stream.type === "live" ? "bg-danger" : "bg-secondary"}`}>
                                { stream.type }
                            </span>
                        </div>
                    </div>
                    <div className={Style.tabContainer}>
                        <Tab tabs={tabs} name={login} baseUrl={"/stream"} />
                    </div>
                </div>
            ) : (
                null
            )}
        </>
    )
}

export default StreamHeader