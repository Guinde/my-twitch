import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';
import loadable from '@loadable/component'

/*********** Store ***********/
import { gameSelector, gamesIsLoadingSelector } from '../../../store/selectors';
import { fetchGame } from '../../../store/actions';

/*********** Components ***********/
import Loading from '../../utils/loading/Loading';
import NotFound from '../../utils/not-found/NotFound';
import GameHeader from './game-header/GameHeader';
import GameStreams from './game-streams/GameStreams';
import Style from './Game.module.scss'

const _ = require('lodash');

const GameVideos = loadable(() => 
    import(/* webpackChunkName: 'Game-Videos' */'./game-videos/GameVideos')
);
const GameClips = loadable(() => 
    import(/* webpackChunckName: 'Game-Clips' */'./game-clips/GameClips')
)
const Clip = loadable(() => 
    import(/* webpackChunckName: 'Clip' */'../clip/Clip')
)

const Game = ({fetchGame, game, isLoading}) => {

    const {gameName} = useParams();

    useEffect(() => {
        fetchGame(gameName);
    }, [fetchGame, gameName])

    return(
        <div className={Style.gameContainer}>
            { isLoading || game == null || game === undefined ? (
                <Loading />
            ) : (
                <>
                    { _.isEmpty(game) ? (
                        <NotFound />
                    ) : (
                        <>
                            <GameHeader game={game}/>
                            <div className={Style.contentContainer}>
                                <Switch>
                                    <Route exact path="/game/:gameName"                            
                                            render={() => <GameStreams gameId={game.id} />} />
                                    <Route exact path="/game/:gameName/videos"                            
                                            render={() => <GameVideos gameId={game.id} />} />
                                    <Route exact path="/game/:gameName/clips"                            
                                            render={() => <GameClips gameId={game.id} gameName={gameName}/>} />
                                    <Route exact path="/game/:gameName/clip/:clipId"                            
                                        render={() => <Clip />} />
                                    <Redirect to="/not-found"  />
                                </Switch>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default connect(state => ({
    game: gameSelector(state),
    isLoading: gamesIsLoadingSelector(state)
  }), {
    fetchGame,
  })(Game)
