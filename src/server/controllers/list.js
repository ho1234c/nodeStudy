import db from '../models';
import _ from 'lodash';

export default {
    //:count
    load(req, res){
        const count = req.query.count || 0;
        db.List.findAll({
                attributes: ['id', 'name', 'detail', 'like', 'createdAt'],
                offset: count,
                limit: 10,
                include: {model: db.User, attributes: ['email', 'nickname']}
            })
            .then((data) => {
                res.json({
                    data: data
                });
            });
    },
    //:listId
    listDetail(req, res){
        db.List.findOne({
                where: {id: req.params.id},
                attributes: ['songInfo']
            })
            .then((data) => {
                res.json({
                    data: data
                })
            })
    },
    createList(req, res){

    },
    //:listId
    like(req, res){
        console.log('test');
    },
    //:listId
    createComment(req, res){

    }

}