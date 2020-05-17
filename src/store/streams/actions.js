import apiTwitch from '../../api/twitch.api';

export const REQUEST_STREAMS = 'request streams';

//export const FETCH_TOP_STREAMS = 'fetch top streams';
export const FETCH_TOP_STREAMS_SUCCESS = 'fetch top streams success';
export const FETCH_TOP_STREAMS_ERROR = 'fetch top streams error';

//export const FETCH_STREAM_USER = 'fetch stream user';
export const FETCH_STREAM_SUCCESS = 'fetch stream success';
export const FETCH_STREAM_ERROR = 'fetch stream error';

//export const FETCH_STREAM_GAME = 'fetch  game user';
export const FETCH_STREAM_GAME_SUCCESS = 'fetch stream game success';
export const FETCH_STREAM_GAME_ERROR = 'fetch stream game error';

export const SET_STREAMS_PAGE = 'set streams page';

export const requestStreams = () => ({
    type: REQUEST_STREAMS
});

/****************** FETCH TOP STREAMS ******************/
export const fetchTopStreamsSuccess = data => ({
    type:FETCH_TOP_STREAMS_SUCCESS,
    data: data,
});

export const fetchTopStreamsError = error => ({
    type: FETCH_TOP_STREAMS_ERROR,
    error: error
});

export const fetchTopStreams = (query = null,  filter = {first: 20}) => async dispatch => {
    dispatch(requestStreams());
    try {
        const data = await apiTwitch.getTopStreams(query, filter);
        dispatch(fetchTopStreamsSuccess(data))
    } catch(e) {
        dispatch(fetchTopStreamsError(e))
    }
}

/****************** FETCH STREAM USER ******************/
export const fetchStreamSuccess = data => ({
    type: FETCH_STREAM_SUCCESS,
    data: data,
});

export const fetchStreamError = error => ({
    type: FETCH_STREAM_ERROR,
    error: error
});

export const fetchStream = login => async dispatch => {
    dispatch(requestStreams());
    try {
        const data = await apiTwitch.getStreamUser(login);
        dispatch(fetchStreamSuccess(data))
    } catch(e) {
        dispatch(fetchStreamError(e))
    }
}

/****************** FETCH STREAM GAME ******************/
export const fetchStreamGameSuccess = data => ({
    type: FETCH_STREAM_GAME_SUCCESS,
    data: data,
});

export const fetchStreamGameError = error => ({
    type: FETCH_STREAM_GAME_ERROR,
    error: error
});

export const fetchStreamGame = (gameId, query = null, filter = {first: 20}) => async dispatch => {
    dispatch(requestStreams());
    try {
        const data = await apiTwitch.getStreamGame(gameId, query, filter);
        dispatch(fetchStreamGameSuccess(data))
    } catch(e) {
        dispatch(fetchStreamGameError(e))
    }
}

/****************** SET STREAMS PAGE ******************/
export const setStreamsPage = page => dispatch =>{
    dispatch({
        type: SET_STREAMS_PAGE,
        page
    })
}
