import * as actions from './actions.js';

export default ( state = { 
    isLoading: false,
    clips: null,
    clip: null,
    page: null,
    error: null
}, action) => {
    switch (action.type) {
        case actions.REQUEST_CLIPS: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actions.FETCH_GAME_CLIPS_SUCCESS:
        case actions.FETCH_USER_CLIPS_SUCCESS: {
            return {
                ...state,
                error: null,
                clips: {...action.clips},
                isLoading: false
            }
        }
        case actions.FETCH_CLIP_SUCCESS: {
            return {
                ...state,
                error: null,
                clip: {...action.clip},
                isLoading: false
            }
        }
        case actions.SET_CLIPS_PAGE: {
            return {
                page: action.page
            }
        }
        case actions.FETCH_GAME_CLIPS_ERROR:
        case actions.FETCH_CLIP_ERROR :
        case actions.FETCH_USER_CLIPS_ERROR : {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        }
        default: {
            return state
        }
    }
}