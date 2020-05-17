import  api  from './api';

export const getClipsData = async (type, id, query, filter) => {
    try {
        let clipsData;
        if(query)
            clipsData = await api.get(`clips?${type}=${id}&${query.query}=${query.pagination}&first=${filter.first}`);
        else 
            clipsData = await api.get(`clips?${type}=${id}&first=${filter.first}`);
        return {
            ...clipsData,
            filter
        };
    } catch (e) {
        return (e);
    }
}

export const getClipsFromGameId = async (gameId, query) => {
    try {
        let clipsData;
        if(query)
            clipsData = await api.get(`clips?game_id=${gameId}&${query.query}=${query.pagination}`);
        else 
            clipsData = await api.get(`clips?game_id=${gameId}`);
        return clipsData;
    } catch(e) {
        return e;
    }
}

export const getClipFromId = async (id) => {
    try {
        const clipsData = api.get(`clips?id=${id}`);
        return clipsData;
    } catch (e) {
        return e;
    }
}