import db from '../models';

export default {
    //:pageNum
    load(req, res){
        db.List.findOne({where:{ id: 1}})
        .then((data) => {
            res.json(data);
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
