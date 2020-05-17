import api  from './api';
const _ = require('lodash');

export const getVideos = async (type, id, query, filter) => {
    try {
        let videosData;
        if(query){
            videosData = await api.get(
            `videos?${type}=${id}&${query.query}=${query.pagination}&period=${filter.period}&sort=${filter.sort}&type=${filter.type}&first=${filter.first}`
            );
        } else {
            videosData = await api.get(
            `videos?${type}=${id}&period=${filter.period}&sort=${filter.sort}&type=${filter.type}&first=${filter.first}`
            );
        }
        return {
            ...videosData,
            filter
        };
    } catch (e) {
        return e;
    }
}

export const videosMap = (video) => {
    let thumbnail;
    const durationFormat = _.join(_.dropRight(_.split(video.duration, /[^0-9]/)), ':');
    if(video.thumbnail_url === ""){
        thumbnail = "https://vod-secure.twitch.tv/_404/404_processing_320x180.png";
    }
    else {
        thumbnail = video.thumbnail_url.replace("%{width}", "320")
                                       .replace("%{height}", "180");
    }
    return {
        ...video,
        duration: durationFormat,
        thumbnail_url: thumbnail
    }
}

