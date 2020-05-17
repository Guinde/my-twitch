import api from './api';
import * as gamesApi from './twitch.api.games';
const _ = require('lodash');

export const getUserIdFromLogin = async (login) => {
    try {
        const userData = await api.get(`users?login=${login}`);
        const user = userData.data.data[0];
        return {
            id: user.id,
            name: user.display_name
        }
    } catch (e) {
        return e;
    }
}

export const getUsersFromIds = async (query) => {
    try {
        const users = await api.get(`users?${query}`);
        return users;
    } catch (e) {
        return e;
    }
}

export const getStreamUserData = async (login) => {
    try {
        const [userData, streamUserData] = await Promise.all([
            api.get(`users?login=${login}`),
            api.get(`streams?user_login=${login}`)
        ]);
        const user = userData.data.data[0];
        const streamUser = streamUserData.data.data[0];
        const gameData = await gamesApi.getGamesFromIds(`id=${streamUser.game_id}`);
        const game = gameData.data.data[0];
        const tagIds = _.join(_.map(streamUser.tag_ids, tag => `tag_id=${tag}`), "&");
        const tagsData = await api.get(`tags/streams?${tagIds}`);
        const tags = _.map(tagsData.data.data, tag => _.values(tag.localization_names)[9])
        const data = {
            ...streamUser,
            ...user,
            game_name: game.name,
            viewer_count: streamUser.viewer_count,
            tags: [...tags],
            box_art_url: game.box_art_url.replace("{width}", "50")
                                         .replace("{height}", "60")
        }
        return data;
    } catch (e) {
        return e;
    }
}
