import config from '../config';
import request from 'request-promise';
import {findNode, createUrl} from '../lib'
import _ from 'lodash';

export default {
    render(req, res) {
        res.render('index.html');
    },
    session(req, res){
        res.json({ user: req.user });
    },
    search(req, res){
        let searchUrl = config.youtube.url,
            params = {
            key: config.youtube.key,
            type: 'video',
            part: 'snippet',
            maxResults: 12,
            q: encodeURIComponent(req.params.word), // there are issue that it can include korean in url.
        };

        if(req.query.pageToken){
            _.assign(params, {pageToken: req.query.pageToken});
        }
        request(createUrl(searchUrl, params))
            .then(result => {
                let data = JSON.parse(result);
                let refinedData = [];

                _.forEach(data.items, value => {
                    let temp = {};
                    temp.videoId = findNode('videoId', value);
                    temp.snippet = findNode('snippet', value);
                    refinedData.push(temp);
                });
                res.json({data: refinedData, nextPageToken: data.nextPageToken});
            })
    }
}