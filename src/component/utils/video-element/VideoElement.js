import React from 'react';
import Style from './VideoElement.module.scss';

const VideoElement = ({video}) => {

    return(
        <div className={`card-container mr-3 mb-3 ${Style.card}`}>
            <div className={Style.thumbnailContainer}>
                <div className={`rounded ${Style.divContainer} ${Style.duration}`}>
                    <span className="text-white">{ video.duration }</span>
                </div>           
                <div className={`rounded ${Style.divContainer} ${Style.viewCount}`}>
                    <span className="text-white">{ video.view_count } vues</span>
                </div>   
                <a href={video.url} target="_blank" rel="noopener noreferrer" >
                    <img alt="stream thumbnail" src={ video.thumbnail_url } className={Style.thumbnail} />
                </a>        
            </div>
            <div className="card-body d-flex flex-row pl-0 pt-2">
                <div className="d-flex flex-column flex-wrap">
                    <span className={`text-truncate font-weight-bold ${Style.title}`}>{ video.title }</span>
                    <span className="font-weight-light text-truncate mr-2">{ video.user_name }</span>
                </div>
            </div>
        </div>
    )
}

export default VideoElement;