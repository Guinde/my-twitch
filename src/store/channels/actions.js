import apiTwitch from '../../api/twitch.api';

export const REQUEST_CHANELS = 'request channels';

//export const FETCH_TOP_STREAMS = 'fetch top streams';
export const FETCH_TOP_CHANNELS_SUCCESS = 'fetch top channels success';
export const FETCH_TOP_CHANNELS_ERROR = 'fetch top channels error';

export const requestChannels = () => ({
    type: REQUEST_CHANELS
});

/****************** FETCH TOP CHANNELS ******************/
export const fetchTopChannelsSuccess = data => ({
    type: FETCH_TOP_CHANNELS_SUCCESS,
    data: data,
});

export const fetchTopChannelsError = error => ({
    type: FETCH_TOP_CHANNELS_ERROR,
    error: error
});

export const fetchTopChannels = (query = null, filter = {first: 15}) => async dispatch => {
    dispatch(requestChannels());
    try {
        const data = await apiTwitch.getTopChannels(query, filter)
        dispatch(fetchTopChannelsSuccess(data))
    } catch(e) {
        dispatch(fetchTopChannelsError(e))
    }
}