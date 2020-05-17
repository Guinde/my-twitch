import * as usersApi from './twitch.api.users';
import * as gamesApi from './twitch.api.games';
import * as streamApi from './twitch.api.stream';
import * as videosApi from './twitch.api.videos';
import * as tagsApi from './twitch.api.tags';
import * as clipsApi from './twitch.api.clips';

const _ = require('lodash');

export default {
    getTopGames: async (query, filter) => {
        try {
            const gamesData = await gamesApi.getTopGamesData(query, filter);
            const data = gamesData.data.data.map(gamesApi.gamesImgMap);
            return {
                games: [...data],
                page: gamesData.data.pagination.cursor,
                filter: gamesData.filter

            }
        } catch(e) {
            return e
        }
    },
    getGame : async (name) => {
        try {
            const gameData = await gamesApi.getGameByName(name);
            const game = gameData.data.data[0];
            return {
                ...game,
                box_art_url: game.box_art_url.replace("{width}", "180")
                                             .replace("{height}", "230")
            };
        } catch (e) {

        }
    }, 
    getTopChannels : async (query, filter) => {
        try {
            const topStreamsData = await streamApi.getTopStreamsData(query, filter);
            
            const topStreams = await streamApi.mapTopStreamWithUserAndGameData(topStreamsData.data.data);
            return topStreams;
        } catch (e) {
            return e;
        }
    },
    getTopStreams: async (query, filter) => {
        try {
            const topStreamsData = await streamApi.getTopStreamsData(query, filter);
            const topStreams = await streamApi.mapTopStreamWithUserAndGameData(topStreamsData.data.data);
            const tagIds = tagsApi.getTagsIdsFromStreams(topStreams);
            const tagsData = await tagsApi.getTagsDataFromIds(_.join(tagIds, "&"));
            const streams = streamApi.mapStreamWithTagsData(topStreams, tagsData);
            return {
                streams: [...streams],
                page: topStreamsData.data.pagination.cursor,
                filter: topStreamsData.filter
            }
        } catch (e) {
            return (e);
        }
    },
    getStreamUser : async (login) => {
        try {
            const data = await usersApi.getStreamUserData(login);
            return data;
        } catch (e) {
            return e;
        }
    },
    getStreamGame : async (gameId, query, filter) => {
        try {
            const streamsData = await streamApi.getStreamsByGameId(gameId, query, filter);
            const streams = await streamApi.mapTopStreamWithUserAndGameData(streamsData.data.data);
            const tagIds = tagsApi.getTagsIdsFromStreams(streams);
            const tagsData = await tagsApi.getTagsDataFromIds(_.join(tagIds, "&"));
            const data = streamApi.mapStreamWithTagsData(streams, tagsData);
            return {
                streams: [...data],
                page: streamsData.data.pagination.cursor,
                filter: streamsData.filter
            }
        } catch(e) {
            return e;
        }
    },
    getUserVideos: async (login, query, filter) => {
        try {
            const user = await usersApi.getUserIdFromLogin(login);
            const videosData = await videosApi.getVideos("user_id", user.id, query, filter);
            const data = videosData.data.data.map(videosApi.videosMap);
            return {
                videos: [...data],
                user,
                filter: videosData.filter,
                page: videosData.data.pagination.cursor
            };
        } catch (e) {

        }
    },
    getGameVideos: async (gameId, query, filter) => {
        try {
            const videosData = await videosApi.getVideos("game_id", gameId, query, filter);
            const data = videosData.data.data.map(videosApi.videosMap);
            return {
                videos: [...data],
                filter: videosData.filter,
                page: videosData.data.pagination.cursor
            };
        } catch (e) {
            return e;
        }
    },
    getUserClips: async (login, query, filter) => {
        try {
            const user = await usersApi.getUserIdFromLogin(login);
            const clipsData = await clipsApi.getClipsData("broadcaster_id", user.id, query, filter);
            return {
                clips: [...clipsData.data.data],
                user,
                page: clipsData.data.pagination.cursor,
                filter: clipsData.filter
            }
        } catch (e) {
            return e
        }
    },
    getClip: async (id) => {
        try {
            const clipsData = await clipsApi.getClipFromId(id);
            const clip = clipsData.data.data[0];
            const gameData = await gamesApi.getGamesFromIds(`id=${clip.game_id}`);
            const game = gameData.data.data[0]
            return {
                ...clip,
                box_art_url: game.box_art_url.replace("{width}", "50")
                                             .replace("{height}", "60"),
                game_name: game.name
            };
        } catch (e) {
            return e
        }
    },
    getGameClips: async (gameId, query, filter) => {
        try {
            const clipsData = await clipsApi.getClipsData("game_id", gameId, query, filter);
            return {
                clips: [...clipsData.data.data],
                page: clipsData.data.pagination.cursor,
                filter: clipsData.filter
            }
        } catch(e) {
            return e;
        }
    }
}