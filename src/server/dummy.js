import db from './models'
import request from 'request-promise';
import _ from 'lodash'
import { findNode } from './lib/index'

// usage: node dummy.js {number of list} {number of detailed music}
if(!(process.argv[2] && process.argv[3])){
    console.log('please enter two integer {number of dummy} {number of song}');
}
else{
    db.sequelize.sync({ force: true })
        .then(() => {
            return dummy(process.argv[2], process.argv[3]);
        })
        .then(msg => {
            return console.log(msg);
        })
        .catch(err => {
            return console.log(err);
        });
}

function dummy(num, infoNum){
    return new Promise((resolve, reject) => {
        const url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAYJcoUSoEpehRGo-0XYHd4zafkiSmt9Wk&type=video&part=snippet&q=%EC%9E%84%EC%B0%BD%EC%A0%95&maxResults=' + infoNum;
        const userDummy = [], listDummy = [], commentDummy = [];

        process.stdout.write('Inserting dummy data');
        const interval = setInterval(() => { process.stdout.write('.') }, 200);

        for(let i=0; i<num; i++){
            userDummy.push({email: 'user' + i + '@dummy.com', nickname: 'userNick' + i, password: 'user' + i});
            listDummy.push({name: 'list' + i, detail: 'detail' + i, like: _randomRange(0, 100), songInfo:'', makerId: _randomRange(1, num), createdAt: _randomDate(new Date(2012, 0, 1), new Date())});
            commentDummy.push({content: 'content' + i, like: _randomRange(0, 100), listId: _randomRange(1, num), writerId: _randomRange(1, num), createdAt: _randomDate(new Date(2012, 0, 1), new Date())});
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
                return Promise.all([db.User.findOne(), db.List.findAll(), db.Comment.findAll()]);
            })
            .then(result => {
                let user = result[0];
                let list = result[1];
                let comment = result[2];

                return Promise.all([user.setListFavor(list), user.setCommentFavor(comment)]);
            })
            .then(() => {
                clearInterval(interval);
                console.log('.');
                resolve('Complete insert ' + num +' dummy data');
            })
            .catch(err => {
                clearInterval(interval);
                console.log('.');
                reject('Fail to insert dummy: ' + err);
            })
    })

}

function _randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function _randomRange(start, end) {
    return Math.floor( (Math.random() * (end - start + 1)) + start );
}