import { createSelector } from 'reselect';

export const streamsSelector = state => state.streams; 

export const streamsIsLoadingSelector = createSelector(
    [streamsSelector],
    streams => streams.isLoading
)

export const streamsListSelector = createSelector(
    [streamsSelector],
    streams => streams.streams
)

export const streamSelector = createSelector(
    [streamsSelector],
    stream => stream.stream
)

export const streamsPageSelector = createSelector(
    [streamsSelector],
    stream => stream.page
)
