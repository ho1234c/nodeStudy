import db from './models'
import request from 'request-promise';
import Promise from 'bluebird';
import _ from 'lodash'
import {findNode} from './lib/index'

export default function(num, infoNum){
    return new Promise((resolve, reject) => {
        const url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAYJcoUSoEpehRGo-0XYHd4zafkiSmt9Wk&type=video&part=snippet&q=%EC%9E%84%EC%B0%BD%EC%A0%95&maxResults=' + infoNum;
        const userDummy = [], listDummy = [], commentDummy = [];

        process.stdout.write('Inserting dummy data');
        const interval = setInterval(() => {process.stdout.write('.')}, 200);

        for(let i=0; i<num; i++){
            userDummy.push({email: 'user' + i + '@dummy.com', nickname: 'userNick' + i, password: 'user' + i});
            listDummy.push({name: 'list' + i, detail: 'detail' + i, like: Math.random() * 100, songInfo:'', makerId: i+1, createdAt: _randomDate(new Date(2012, 0, 1), new Date())});
            commentDummy.push({content: 'content' + i, like: Math.random() * 100, ListId: 1, writerId: i+1});
        }

        // insert user dummy
        db.User.bulkCreate(userDummy)
            .then(() => {
                // get song info dummy.
                return request(url);
            })
            .then(songInfo => {
                let data = JSON.parse(songInfo);
                let songInfoDummy = [];

                _.forEach(data.items, value => {
                    let refinedData = {};
                    refinedData.videoId = findNode('videoId', value);
                    refinedData.snippet = findNode('snippet', value);
                    songInfoDummy.push(refinedData);
                });

                // insert list dummy.
                return db.List.bulkCreate(_.map(listDummy, (obj) => { obj.songInfo = JSON.stringify(songInfoDummy); return obj}))
            })
            .then(() => {
                // insert comment dummy.
                return db.Comment.bulkCreate(commentDummy);
            })
            .then(() => {
                return Promise.all([db.User.findOne(), db.List.findAll()]);
            })
            .then(result => {
                let user = result[0];
                let list = result[1];

                return user.setListFavor(list);
            })
            .then(() => {
                clearInterval(interval);
                console.log('.');
                resolve('Complete insert ' + num +' dummy data');
            })
            .catch(err => {
                clearInterval(interval);
                console.log('.');
                reject(err);
            })
    })

}

function _randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}