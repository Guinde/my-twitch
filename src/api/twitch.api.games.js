import  api  from './api';

export const gamesImgMap = game => ({
    ...game,
    box_art_url: game.box_art_url.replace("{width}", "250")
                                 .replace("{height}", "300")
})

export const getTopGamesData = async (query, filter) => {
    try {
        let games;
        if(query)
            games = await api.get(`games/top?${query.query}=${query.pagination}&first=${filter.first}`)
        else 
            games = await api.get(`games/top?first=${filter.first}`);
        return {
            ...games,
            filter
        };
    } catch (e) {
        return e;
    }
}

export const getGamesFromIds = async (query) => {
    try {
        const games = await api.get(`games?${query}`);
        return games;
    } catch (e) {
        return e;
    }
}

export const getGameByName = async (name) => {
    try {
        const gameData = await api.get(`games?name=${name}`);
        return gameData;
    } catch (e) {

    }
}
