import db from '../models';

export default {
    //:page
    load(req, res){
        db.List.findAll()
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