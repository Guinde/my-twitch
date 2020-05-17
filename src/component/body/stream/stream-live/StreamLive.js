import React from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { Link } from 'react-router-dom';
import Loading from '../../../utils/loading/Loading';
import viewIcon from '../../../../icon/viewIcon.svg';
import personIcon from '../../../../icon/personIcon.svg';
import Style from './StreamLive.module.scss';

const StreamLive = ({stream, login}) => {

    return(
        <>
            { stream !== null || stream.tags !== undefined ? (
                <div>
                    <ReactTwitchEmbedVideo height="600px" width="100%" channel={ login } />
                    <div className={`mt-2 mb-2 ${Style.infosContainer}`}>
                        <div className={`justify-content-between pl-2 mb-2 ${Style.streamInfo}`}>
                            <span className="font-weight-bold h5 w-75 mr-5">{stream.title}</span>
                            <div className="d-flex flex-row w-25 justify-content-end">
                                <span className="mr-3 text-danger" data-toggle="tooltip" data-placement="bottom" title="Spectateurs">
                                    <img src={personIcon} alt="person" className="mr-2" /> 
                                    {stream.viewer_count}
                                </span>
                                <span data-toggle="tooltip" data-placement="bottom" title="Nombres total de vues">
                                    <img src={viewIcon} alt="view" className="mr-2" /> 
                                    {stream.view_count}
                                </span>
                            </div>
                        </div>
                        <div className="d-flex flex-row pl-2">
                            <Link className="mr-2"
                                  to={{pathname: `/game/${ stream.game_name }`}}>
                                <img alt="game box art"  src={ stream.box_art_url } />
                            </Link>
                            <div className="d-flex flex-column justify-content-between">
                                <div className={Style.containerGameName}>
                                    <span>Jeu : </span>
                                    <Link className={Style.gameName} 
                                          to={{pathname: `/game/${ stream.game_name }`}}>
                                        <span>{stream.game_name}</span>
                                    </Link>
                                </div>
                                <div className="d-flex flex-row">
                                    { stream.tags.map((tag, i) => (
                                        <span key={`${stream.id}-${i}`} className="badge badge-pill badge-secondary text-white mr-2" >{ tag }</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default StreamLive;