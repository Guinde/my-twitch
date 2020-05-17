import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchClip } from '../../../store/actions';
import { clipSelector } from '../../../store/selectors';
import Loading from '../../utils/loading/Loading';
import viewIcon from '../../../icon/viewIcon.svg';
import Style from './Clip.module.scss';

const Clip = ({fetchClip, clip}) => {

    const {clipId} = useParams();

    useEffect(() => {
        fetchClip(clipId);
    }, [fetchClip, clipId])

    return(
        <>
            { clip ? (
                <div className={Style.clipContainer}>
                    <iframe title={clip.title} 
                            className={Style.iframe} 
                            src={clip.embed_url} 
                            allowFullScreen />
                    <div className={`mt-2 mb-2`}>
                        <div className="d-flex flex-row justify-content-between pl-2 mb-2">
                            <span className="font-weight-bold h5 w-75 mr-5">{clip.title}</span>
                            <div className="d-flex flex-row w-25 justify-content-end">
                                <span data-toggle="tooltip" data-placement="bottom" title="Nombres total de vues">
                                    <img src={viewIcon} alt="view" className="mr-2" /> 
                                    {clip.view_count}
                                </span>
                            </div>
                        </div>
                        <div className="d-flex flex-row pl-2">
                            <div className="mr-2">
                                <Link to={{pathname: `/game/${ clip.game_name }`}}>
                                    <img alt="game box art"  src={ clip.box_art_url } />
                                </Link>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <div className={Style.containerGameName}>
                                    <span>Jeu : </span>
                                    <Link className={Style.gameName} 
                                          to={{pathname: `/game/${ clip.game_name }`}}>
                                        <span >{clip.game_name}</span>
                                    </Link>
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

export default connect(state => ({
    clip: clipSelector(state),
  }), {
    fetchClip,
  })(Clip)
