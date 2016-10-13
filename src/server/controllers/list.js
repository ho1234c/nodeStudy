import db from '../models';

export default {
    //:page
    load(req, res){
        db.List.findAll({include: {model: db.User, attributes: ['email', 'nickname']}})
        .then((data) => {
            res.json({data});
        });
    },
    //:listId
    // get song included at list
    listDetail(req, res){

    },
    createList(req, res){

    },
    //:listId
    like(req, res){

    },
    //:listId
    createComment(req, res){

    }

}