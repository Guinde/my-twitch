import * as actions from './actions.js';

export default ( state = { 
    isLoading: false,
    topGames: null,
    game: null,
    page: null,
    error: null,
}, action) => {
    switch (action.type) {
        case actions.REQUEST_GAMES: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actions.FETCH_TOP_GAMES_SUCCESS: {
            return {
                ...state,
                error: null,
                topGames: {...action.data},
                isLoading: false
            }
        }
        case actions.FETCH_GAME_SUCCESS : {
            return {
                ...state,
                error: null,
                game: {...action.data},
                isLoading: false
            }
        }
        case actions.SET_GAMES_PAGE: {
            return {
                page: action.page
            }
        }
        case actions.FETCH_GAME_ERROR :
        case actions.FETCH_TOP_GAMES_ERROR: {
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