import apiTwitch from '../../api/twitch.api';

export const REQUEST_GAMES = 'request games';

export const FETCH_TOP_GAMES_SUCCESS = 'fetch top games success';
export const FETCH_TOP_GAMES_ERROR = 'fetch top games error';

export const FETCH_GAME_SUCCESS = 'fetch game success';
export const FETCH_GAME_ERROR = 'fetch game error';

export const SET_GAMES_PAGE = 'set games page';

export const requestGames = () => ({
    type: REQUEST_GAMES
});


/****************** FETCH TOP GAMES ******************/
export const fetchTopGamesSuccess = data => ({
    type: FETCH_TOP_GAMES_SUCCESS,
    data: data,
});

export const fetchTopGamesError = error => ({
    type: FETCH_TOP_GAMES_ERROR,
    error: error
});

export const fetchTopGames = (query = null, filter = {first: 20}) => async dispatch => {
    dispatch(requestGames());
    try {
        const data = await apiTwitch.getTopGames(query, filter)
        dispatch(fetchTopGamesSuccess(data))
    } catch(e) {
        dispatch(fetchTopGamesError(e))
    }
}

/****************** FETCH GAME ******************/
export const fetchGameSuccess = data => ({
    type: FETCH_GAME_SUCCESS,
    data: data,
});

export const fetchGameError = error => ({
    type: FETCH_GAME_ERROR,
    error: error
});

export const fetchGame = name => async dispatch => {
    dispatch(requestGames());
    try {
        const data = await apiTwitch.getGame(name)
        dispatch(fetchGameSuccess(data))
    } catch(e) {
        dispatch(fetchGameError(e))
    }
}

/****************** SET VIDEOS PAGE ******************/
export const setGamesPage = page => dispatch =>{
    dispatch({
        type: SET_GAMES_PAGE,
        page
    })
}
