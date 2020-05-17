import * as actions from './actions.js';

export default ( state = { 
    isLoading: false,
    videos: null,
    page: null,
    error: null,
}, action) => {
    switch (action.type) {
        case actions.REQUEST_VIDEOS: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actions.FETCH_GAME_VIDEOS_SUCCESS:
        case actions.FETCH_USER_VIDEOS_SUCCESS: {
            return {
                ...state,
                error: null,
                videos: {...action.data},
                isLoading: false
            }
        }
        case actions.SET_VIDEOS_PAGE: {
            return {
                page: action.page
            }
        }
        case actions.FETCH_GAME_VIDEOS_ERROR: 
        case actions.FETCH_USER_VIDEOS_ERROR: {
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