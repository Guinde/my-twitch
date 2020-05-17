import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTopChannels } from '../../store/actions';
import { topChannelsSelector, channelsIsLoadingSelector } from '../../store/selectors';
import Style from "./TopChannels.module.scss";

const TopChannels = ({topChannels, fetchTopChannels, isLoading}) => {

    useEffect(() => {
        fetchTopChannels();
      }, [fetchTopChannels])

    return (
        <>
            { isLoading ? (
                <div className={`bg-light d-flex ${Style.sidebar}`}>
                    <span className="align-self-center ml-auto mr-auto h3 text-dark">Loading</span>
                </div>
            ) : (
                <div className={`bg-light ml-0 mr-0 ${Style.sidebar}`}>
                    <h5 className="text-center text-dark font-weight-bold pt-4 pb-4"> Chaînes recomandées</h5>
                    <div className="listStreams d-flex flex-column">
                        { topChannels.map((channel, index) => (
                            <div className="d-flex flex-row flex-wrap mb-3" key={index}>
                                <Link className={Style.img}
                                      to={{pathname: `/stream/${ channel.login }`}}>
                                    <img src={channel.profile_image_url} 
                                        width="40" 
                                        height="40" 
                                        alt="profile" 
                                        className="rounded-circle align-self-center"/>
                                </Link>
                                <div className="d-flex flex-column pl-3">
                                    <Link className={`text-truncate ${Style.link} ${Style.userName}`} 
                                        to={{pathname: `/stream/${ channel.login }`}}>
                                        <span >{ channel.user_name }</span>
                                    </Link>
                                    <Link className={`font-weight-light text-truncate ${Style.link} ${Style.gameName}`}
                                        to={{pathname: `/game/${ channel.game_name }`}}>
                                        <span>{ channel.game_name }</span>
                                    </Link>
                                </div>
                                <div className="d-flex flex-row ml-auto pr-2">
                                    <div className={`rounded-circle bg-danger mt-2 mr-2 ${Style.redPoint}`}/>
                                    <span className={`text-dark ${Style.view}`}>{ channel.viewer_count }</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default connect(state => ({
    topChannels: topChannelsSelector(state),
    isLoading: channelsIsLoadingSelector(state)
  }), {
    fetchTopChannels
  })(TopChannels)