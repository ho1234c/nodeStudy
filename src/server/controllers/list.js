import db from '../models';

export default {
    //query.count
    load(req, res){
        const count = req.query.count || 0;
        db.List.findAll({
                attributes: ['id', 'name', 'detail', 'like', 'createdAt'],
                offset: count,
                limit: 10,
                include: {model: db.User, attributes: ['email', 'nickname']}
            })
            .then(data => {
                res.json({
                    data: data
                });
            });
    },
    //params.id
    listDetail(req, res){
        db.List.findOne({
                where: {id: req.params.id},
                attributes: ['songInfo']
            })
            .then(data => {
                res.json({
                    data: data
                })
            })
    },
    createList(req, res){
        let data = req.body;
        data.songInfo = JSON.stringify(data.songInfo);
        db.List.create(data)
            .then(result => {
                console.log(result);
            })

    },
    //:listId
    like(req, res){

    },
    //:listId
    createComment(req, res){

    }

}