import db from '../models/index'
import promise from 'bluebird';
import request from 'request-promise';

export default {
    render(req, res) {
        res.render('index');
    },
    dummy(req, res) {
        const url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAYJcoUSoEpehRGo-0XYHd4zafkiSmt9Wk&type=type&part=snippet&q=%EC%9E%84%EC%B0%BD%EC%A0%95';

        const userDummy = [
            {email: 'user1@dummy.com', nickname: 'user1', password: 'user1'},
            {email: 'user2@dummy.com', nickname: 'user2', password: 'user2'},
            {email: 'user3@dummy.com', nickname: 'user3', password: 'user3'}
        ];

        const listDummy = [
            {name: 'list1', detail: 'detail1', like: 100, songInfo: 'songInfo1', makerId: 1},
            {name: 'list2', detail: 'detail2', like: 200, songInfo: 'songInfo2', makerId: 2},
            {name: 'list3', detail: 'detail3', like: 300, songInfo: 'songInfo3', makerId: 3}
        ];

        const commentDummy = [
            {content: 'content1', like: 11, ListId: 1, writerId: 1},
            {content: 'content2', like: 21, ListId: 2, writerId: 2},
            {content: 'content3', like: 31, ListId: 3, writerId: 3}
        ];

        const pm1 = db.User.bulkCreate(userDummy);
        const pm2 = db.List.bulkCreate(listDummy);
        const pm3 = db.Comment.bulkCreate(commentDummy);
        const pm4 = request(url);

        promise.all([pm1, pm2, pm3, pm4])
            .then((result) => {
                db.List.findOne({where: {id: 1}}).then((one) => {
                    let songInfoData = JSON.parse(result[3]);
                    one.updateAttributes({songInfo: JSON.stringify(songInfoData)});
                    console.log('Complete insert dummy data');
                })
            })

    }
}