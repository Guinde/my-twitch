import apiTwitch from '../../api/twitch.api';

export const REQUEST_CLIPS = 'request clips';

export const FETCH_USER_CLIPS_SUCCESS = 'fetch user clips success';
export const FETCH_USER_CLIPS_ERROR = 'fetch user clips error';

export const FETCH_GAME_CLIPS_SUCCESS = 'fetch game clips success';
export const FETCH_GAME_CLIPS_ERROR = 'fetch game clips error';

export const FETCH_CLIP_SUCCESS = 'fetch clip success';
export const FETCH_CLIP_ERROR = 'fetch clip error';

export const SET_CLIPS_PAGE = 'set clips page';

export const requestClips = () => ({
    type: REQUEST_CLIPS
});

/****************** FETCH USER CLIPS ******************/
export const fetchUserClipsSuccess = data => ({
    type: FETCH_USER_CLIPS_SUCCESS,
    clips: data
});

export const fetchUserClipsError = error => ({
    type: FETCH_USER_CLIPS_ERROR,
    error: error
});

export const fetchUserClips = (login, query = null, filter = {first: 20}) => async dispatch => {
    dispatch(requestClips());
    try {
        const data = await apiTwitch.getUserClips(login, query, filter);
        dispatch(fetchUserClipsSuccess(data))
    } catch(e) {
        dispatch(fetchUserClipsError(e))
    }
}

/****************** FETCH GAME CLIPS ******************/
export const fetchGameClipsSuccess = data => ({
    type: FETCH_GAME_CLIPS_SUCCESS,
    clips: data
});

export const fetchGameClipsError = error => ({
    type: FETCH_GAME_CLIPS_ERROR,
    error: error
});

export const fetchGameClips = (gameId, query = null, filter = {first: 20}) => async dispatch => {
    dispatch(requestClips());
    try {
        const data = await apiTwitch.getGameClips(gameId, query, filter);
        dispatch(fetchGameClipsSuccess(data))
    } catch(e) {
        dispatch(fetchGameClipsError(e))
    }
}

/****************** FETCH CLIP ******************/
export const fetchClipSuccess = data => ({
    type: FETCH_CLIP_SUCCESS,
    clip: data
});

export const fetchClipError = error => ({
    type: FETCH_CLIP_ERROR,
    error: error
});

export const fetchClip = id => async dispatch => {
    dispatch(requestClips());
    try {
        const data = await apiTwitch.getClip(id);
        dispatch(fetchClipSuccess(data))
    } catch(e) {
        dispatch(fetchClipError(e))
    }
}

/****************** SET CLIPS PAGE ******************/
export const setClipsPage = page => dispatch =>{
    dispatch({
        type: SET_CLIPS_PAGE,
        page
    })
}
