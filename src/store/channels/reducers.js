import * as actions from './actions.js';

export default ( state = { 
    isLoading: false,
    topChannels: [],
    error: null,
}, action) => {
    switch (action.type) {
        case actions.REQUEST_CHANELS: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actions.FETCH_TOP_CHANNELS_SUCCESS: {
            return {
                ...state,
                error: null,
                topChannels: [...action.data],
                isLoading: false
            }
        }
        case actions.FETCH_TOP_CHANNELS_ERROR: {
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