import apiTwitch from '../../api/twitch.api';

export const REQUEST_VIDEOS = 'request videos';

export const FETCH_USER_VIDEOS_SUCCESS = 'fetch user videos success';
export const FETCH_USER_VIDEOS_ERROR = 'fetch user videos error';

export const FETCH_GAME_VIDEOS_SUCCESS = 'fetch game videos success';
export const FETCH_GAME_VIDEOS_ERROR = 'fetch game videos error';

export const SET_VIDEOS_PAGE = 'set videos page';

export const requestVideos = () => ({
    type: REQUEST_VIDEOS
});

/****************** FETCH USER VIDEOS ******************/
export const fetchUserVideosSuccess = data => ({
    type: FETCH_USER_VIDEOS_SUCCESS,
    data: data,
});

export const fetchUserVideosrError = error => ({
    type: FETCH_USER_VIDEOS_ERROR,
    error: error
});

export const fetchUserVideos = (login, query = null, filter = {period: 'all', sort: 'time', type: 'all', first: 20}) => async dispatch => {
    dispatch(requestVideos());
    try {
        const data = await apiTwitch.getUserVideos(login, query, filter);
        dispatch(fetchUserVideosSuccess(data))
    } catch(e) {
        dispatch(fetchUserVideosrError(e))
    }
}

/****************** FETCH GAME VIDEOS ******************/
export const fetchGameVideosSuccess = data => ({
    type: FETCH_GAME_VIDEOS_SUCCESS,
    data: data,
});

export const fetchGameVideosrError = error => ({
    type: FETCH_GAME_VIDEOS_ERROR,
    error: error
});

export const fetchGameVideos = (gameId, query = null, filter = {period: 'all', sort: 'time', type: 'all', first: 20}) => async dispatch => {
    dispatch(requestVideos());
    try {
        const data = await apiTwitch.getGameVideos(gameId, query, filter);
        dispatch(fetchGameVideosSuccess(data))
    } catch(e) {
        dispatch(fetchGameVideosrError(e))
    }
}

/****************** SET VIDEOS PAGE ******************/
export const setVideosPage = page => dispatch =>{
    dispatch({
        type: SET_VIDEOS_PAGE,
        page
    })
}
