import React from 'react';
import { Link } from 'react-router-dom';
import Style from './ClipElement.module.scss';

const ClipElement = ({clip, name, baseUrl}) => {

    return(
        <div className={`card-container mr-3 mb-3 ${Style.card}`}>
            <div className={Style.thumbnailContainer}>          
                <div className={`rounded ${Style.divContainer} ${Style.viewCount}`}>
                    <span className="text-white">{ clip.view_count } vues</span>
                </div>   
                <Link to={{pathname: `${baseUrl}/${ name }/clip/${ clip.id }`}}>
                    <img alt="stream thumbnail" width="320" height="180" src={ clip.thumbnail_url } className={Style.thumbnail} />
                </Link>        
            </div>
            <div className="card-body d-flex flex-row pl-0 pt-2">
                <div className="d-flex flex-column flex-wrap">
                    <span className={`text-truncate font-weight-bold ${Style.title}`}>{ clip.title }</span>
                    <span className="font-weight-light text-truncate mr-2">{ clip.broadcaster_name }</span>
                </div>
            </div>
        </div>
    )
}

export default ClipElement