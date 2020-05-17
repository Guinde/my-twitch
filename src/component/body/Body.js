import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component'

/*********** Components ***********/
import Home from './home/Home';

import Style from './Body.module.scss';

const StreamsList = loadable(() => 
        import(/* webpackChunkName: 'Streams-List' */'./streams-list/StreamsList')
);
const Stream = loadable(() => 
        import(/* webpackChunkName: 'Live-Stream' */'./stream/Stream')
);
const GameList = loadable(() => 
        import(/* webpackChunkName: 'Games-List' */'./game-list/GameList')
);
const Game = loadable(() => 
        import(/* webpackChunkName: 'Games' */'./game/Game')
);
const NotFound = loadable(() => 
        import(/* webpackChunckName: 'Not-Found' */'../utils/not-found/NotFound')
);

const Body = () => {
  
  return (
    <div className={Style.main}>
      <Switch>
          <Route exact path="/"
                  render={() => <Home />} />
          <Route exact path="/top-games"
                  render={() => <GameList />} />
          <Route path="/game/:gameName"
                  render={() => <Game />} />
          <Route exact path="/top-streams" 
                  render={() => <StreamsList />} />
          <Route path="/stream/:login" 
                  render={() => <Stream />} />
          <Route path="/not-found" 
                  render={() => <NotFound />} />
          <Redirect to="/not-found" />
      </Switch>
    </div>
  )
}

export default Body;