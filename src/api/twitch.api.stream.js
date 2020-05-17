import  api  from './api';
import * as usersApi from './twitch.api.users';
import * as gamesApi from './twitch.api.games';
const _ = require('lodash');

export const streamChannelMap = (stream, user, game) => ({
    ...stream,
    login: user.login,
    profile_image_url: user.profile_image_url,
    game_name: game.name,
})

    

export const streamMap = (stream, tags) => ({
    ...stream,
    thumbnail_url: stream.thumbnail_url.replace("{width}", "320")
                                       .replace("{height}", "180"),
    tags: tags
})

export const getStreamByLogin = async login => {
    try {
        const streamData = await api.get(`streams?user_login=${login}`);
        return streamData;
    } catch (e) {
        return e;
    }
}

export const getStreamsByGameId = async (gameId, query, filter) => {
    try {
        let streams;
        if(query)
            streams = await api.get(`streams?game_id=${gameId}&${query.query}=${query.pagination}&first=${filter.first}`)
        else 
            streams = await api.get(`streams?game_id=${gameId}&first=${filter.first}`);
        return {
            ...streams,
            filter
        };
    } catch(e) {
        return e;
    }
}

export const getTopStreamsData = async (query, filter) => {
    try {
        let topStreams;
        if(query)
            topStreams = await api.get(`streams?${query.query}=${query.pagination}&first=${filter.first}`);
        else 
            topStreams = await api.get(`streams?first=${filter.first}`);
        return {
            ...topStreams,
            filter
        };
    } catch (e) {
        return e;
    }
}

export const mapTopStreamWithUserAndGameData = async (streams) => {
    try {
        const topStreams = [...streams];
        const userIds = [];
        const gamesIds = [];
        _.forEach(topStreams, stream => {
            userIds.push(`id=${stream.user_id}`);
            gamesIds.push(`id=${stream.game_id}`);
        })
        const [getGames, getUsers] = await Promise.all([
            gamesApi.getGamesFromIds(_.join(gamesIds, "&")), 
            usersApi.getUsersFromIds(_.join(userIds, "&"))
        ]);
        const length = topStreams.length;
        for(let i = 0; i < length; i++) {
            const user = _.find(getUsers.data.data, {'id': topStreams[i].user_id})
            const game = _.find(getGames.data.data, {'id': topStreams[i].game_id})
            topStreams[i] = streamChannelMap(topStreams[i], user, game);
        }
        return topStreams;
    } catch (e) {
        return e;
    }
}

export const mapStreamWithTagsData = (streams, tagsData) => {
    const length = streams.length;
    for(let i = 0; i < length; i++) {
        const tags = [];
        for(let j = 0; j < streams[i].tag_ids.length; j++){
            const t = _.find(tagsData.data.data, {"tag_id" : streams[i].tag_ids[j]})
            if(t !== undefined){
                //tags.push(t);
                tags.push(_.values(t.localization_names)[9])
            }
        }
        streams[i] = streamMap(streams[i], tags);
    }
    return streams;
}

