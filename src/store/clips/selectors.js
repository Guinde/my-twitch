import { createSelector } from 'reselect';

export const clipsSelector = state => state.clips; 

export const clipsIsLoadingSelector = createSelector(
    [clipsSelector],
    clips => clips.isLoading
)

export const clipsListSelector = createSelector(
    [clipsSelector],
    clips => clips.clips
)

export const clipSelector = createSelector(
    [clipsSelector],
    clips => clips.clip
)

export const clipsPageSelector = createSelector(
    [clipsSelector],
    clips => clips.page
)
