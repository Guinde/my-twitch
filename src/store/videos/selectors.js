import { createSelector } from 'reselect';

export const videosSelector = state => state.videos; 

export const videosIsLoadingSelector = createSelector(
    [videosSelector],
    videos => videos.isLoading
)

export const VideosListSelector = createSelector(
    [videosSelector],
    videos => videos.videos
)

export const VideosPageSelector = createSelector(
    [videosSelector],
    videos => videos.page
)

export const VideosFiltersSelector = createSelector(
    [videosSelector],
    videos => videos.filters
)