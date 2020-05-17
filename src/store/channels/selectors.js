import { createSelector } from 'reselect';

export const channelsSelector = state => state.channels; 

export const channelsIsLoadingSelector = createSelector(
    [channelsSelector],
    channels => channels.isLoading
)

export const topChannelsSelector = createSelector(
    [channelsSelector],
    channels => channels.topChannels
)
