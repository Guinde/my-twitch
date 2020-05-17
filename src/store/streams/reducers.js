import * as actions from './actions.js';

export default ( state = { 
    isLoading: false,
    streams: null,
    stream: null,
    page: null,
    error: null,
}, action) => {
    switch (action.type) {
        case actions.REQUEST_STREAMS: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actions.FETCH_STREAM_GAME_SUCCESS:
        case actions.FETCH_TOP_STREAMS_SUCCESS: {
            return {
                ...state,
                error: null,
                streams: {...action.data},
                isLoading: false
            }
        }
        case actions.FETCH_STREAM_SUCCESS: {
            return {
                ...state,
                error: null,
                stream: {...action.data},
                isLoading: false
            }
        }
        case actions.SET_STREAMS_PAGE: {
            return {
                page: action.page
            }
        }
        case actions.FETCH_STREAM_GAME_ERROR:
        case actions.FETCH_STREAM_ERROR:
        case actions.FETCH_TOP_STREAMS_ERROR: {
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