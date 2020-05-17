import { createSelector } from 'reselect';

export const GamesSelector = state => state.games; 

export const gamesIsLoadingSelector = createSelector(
    [GamesSelector],
    games => games.isLoading
)

export const topGamesSelector = createSelector(
    [GamesSelector],
    games => games.topGames
)

export const gameSelector = createSelector(
    [GamesSelector],
    games => games.game
)

export const topGamesPageSelector = createSelector(
    [GamesSelector],
    games => games.page
)
