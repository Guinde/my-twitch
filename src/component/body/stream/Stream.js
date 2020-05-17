import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';
import loadable from '@loadable/component'

/*********** Store ***********/
import { streamSelector, streamsIsLoadingSelector } from '../../../store/selectors';
import { fetchStream } from '../../../store/actions';

/*********** Components ***********/
import StreamLive from './stream-live/StreamLive';
import NotFound from '../../utils/not-found/NotFound';
import StreamHeader from './stream-header/StreamHeader';
import Loading from '../../utils/loading/Loading';

import Style from './Stream.module.scss';

const _ = require('lodash');

const StreamVideos = loadable(() => import(/* webpackChunkName: 'Live-Stream-Videos' */'./stream-videos/StreamVideos'));
const StreamClips = loadable(() => import(/* webpackChunkName: 'Live-Stream-Clips' */'./stream-clips/StreamClips'));
const Clip = loadable(() => import(/* webpackChunkName: 'Live-Stream-Clip' */'../clip/Clip'));

const Stream = ({stream, fetchStream, isLoading}) => {
    
    const {login} = useParams();

    useEffect(() => {
        fetchStream(login);
    }, [fetchStream, login]);
    
    return(
        <div className={`w-100 h-100 d-flex flex-column ${Style.liveStream}`}>
            { isLoading || stream == null ? (
                <Loading />
            ) : (
                <>
                    { _.isEmpty(stream) ? (
                        <NotFound />
                    ) : (
                    <>
                        <StreamHeader stream={ stream } login={ login } />
                        <Switch>
                            <Route exact path="/stream/:login"                            
                                    render={() => <StreamLive stream={ stream } login={ login }/>} />
                            <Route exact path="/stream/:login/videos"                            
                                    render={() => <StreamVideos />} />
                            <Route exact path="/stream/:login/clips"                            
                                    render={() => <StreamClips />} />
                            <Route exact path="/stream/:login/clip/:clipId"                            
                                    render={() => <Clip />} />
                            <Redirect to="/not-found"  />
                        </Switch>
                    </>

                    ) }
                </>
            )}
        </div>
    )
}

export default connect(state => ({
    stream: streamSelector(state),
    isLoading: streamsIsLoadingSelector(state)
  }), {
    fetchStream,
  })(Stream)