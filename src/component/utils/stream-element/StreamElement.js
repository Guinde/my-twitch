import React from 'react';
import { Link } from 'react-router-dom';
import Style from './StreamElement.module.scss';

const StreamElement = ({stream}) => {

    let classType = stream.type === "live" ? "bg-danger" : "bg-secondary";

    return (
        <div className={`card card-container mr-3 mb-3 ${Style.card}`}>
            <div className={`rounded ${classType} ${Style.type}`}>
                <span className="font-weight-bold text-white text-uppercase">{ stream.type}</span>
            </div>
            <Link to={{pathname: `/stream/${ stream.login }`}}>
                <img alt="stream thumbnail" src={ stream.thumbnail_url } className={Style.thumbnail} />
            </Link>
            <div className="card-body d-flex flex-row pl-0 pt-2">
                <Link to={{pathname: `/stream/${ stream.login }`}}>
                    <img src={stream.profile_image_url} 
                         width="40" 
                         height="40" 
                         alt="profile" 
                         className="rounded-circle mr-2 mt-1"/>
                </Link>
                <div className="d-flex flex-column flex-wrap">
                    <Link className={`text-truncate ${Style.title}`} 
                        to={{pathname: `/stream/${ stream.login }`}}>
                        <span>{ stream.title }</span>
                    </Link>
                    <Link className={`font-weight-light text-truncate mr-2 ${Style.link}`}
                        to={{pathname: `/stream/${ stream.login }`}}>
                        <span className="">{ stream.login }</span>
                    </Link>
                    <span className={`font-weight-light text-truncate game ${Style.game}`}>{stream.game_name}</span>
                    <div className="d-flex flex-row mt-1">
                        { stream.tags.slice(0, 2).map((t, i) => (
                            <span key={`${stream.id}-${i}`} className="badge badge-pill badge-secondary text-white mr-2">{ t }</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StreamElement;