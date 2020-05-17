import api from './api';
const _ = require('lodash');

export const getTagsDataFromIds = async (tagsIds) => {
    try {
        const tags = await api.get(`tags/streams?${tagsIds}`);
        return tags
    } catch(e) {
        return e;
    }
}

export const getTagsIdsFromStreams = (streams) => {
    const tagIdsquery = [];
    const tagsIds = _.uniq(_.flatMap(streams, stream => stream.tag_ids), "tag_ids");
    _.forEach(tagsIds, tag => {
        if(tag !== undefined)
            tagIdsquery.push(`tag_id=${tag}`);
    })
    return tagIdsquery;
}

