import db from './models'
import request from 'request-promise';
import _ from 'lodash'
import {findNode} from './lib/index'

export default function(num, callback){
    const url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAYJcoUSoEpehRGo-0XYHd4zafkiSmt9Wk&type=video&part=snippet&q=%EC%9E%84%EC%B0%BD%EC%A0%95&maxResults=20';
    const userDummy = [], listDummy = [], commentDummy = [];

    for(let i=0; i<num; i++){
        userDummy.push({email: 'user' + i + '@dummy.com', nickname: 'userNick' + i, password: 'user' + i});
        listDummy.push({name: 'user' + i, detail: 'detail' + i, like: 100, songInfo:'', makerId: i+1});
        commentDummy.push({content: 'content' + i, like: 10*i, ListId: i+1, writerId: i+1});
    }

    db.User.bulkCreate(userDummy)
        .then(() => {
            return request(url);
        })
        .then((songInfo) => {
            let data = JSON.parse(songInfo);
            let songInfoDummy = [];

            _.forEach(data.items, (value) => {
                let refinedData = {};
                refinedData.videoId = findNode('videoId', value);
                refinedData.snippet = findNode('snippet', value);
                songInfoDummy.push(refinedData);
            });
            return db.List.bulkCreate(_.map(listDummy, (obj) => { obj.songInfo = JSON.stringify(songInfoDummy); return obj}))
        })
        .then(() => {
            return db.Comment.bulkCreate(commentDummy);
        })
        .then(() => {
            callback('Complete insert ' + num +' dummy data');
        })
        .catch((err) => {
            callback(err);
        })
}