import db from '../models';
import config from '../config';
import multer from  'multer';
import crypto from 'crypto';
import path from 'path';
import Promise from 'bluebird';

export default {
    //query.count, query.order, query.word
    load(req, res){
        const count = req.query.count || 0,
              order = req.query.order || 'createdAt',
              word = req.query.word || "";

        db.List.findAll({
            where: { name: { $like: '%' + word + '%' } },
            attributes: ['id', 'name', 'detail', 'like', 'createdAt', 'thumbnail'],
            order: [[order, 'DESC']],
            offset: count,
            limit: 10,
            include: {model: db.User, attributes: ['nickname']},
        })
            .then(data => {
                res.json({
                    data: data
                });
            });
    },
    //params.id
    detail(req, res){
        db.List.findOne({
            where: {id: req.params.id},
            attributes: ['songInfo'],
            include: {model: db.Comment, attributes: ['id', 'content', 'like', 'createdAt'], include: {model: db.User, attributes: ['nickname']}},
        })
            .then(data => {
                res.json({
                    data: data
                })
            })
    },
    create(req, res){
        let data = req.body;

        if(req.file && req.file.filename){
            data.thumbnail = req.file.filename;
        }
        data.songInfo = JSON.stringify(data.songInfo);
        db.List.create(data)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(result => {
                res.status(500).json({result})
            })
    },
    //params.id, query.classify
    like(req, res){
        Promise.all([db.List.findOne({where: {id: req.params.id}}), db.User.findOne({where: {id: req.user.id}})])
            .then(data => {
                if(req.query.classify == 'increment'){
                    return Promise.all([data[0].increment('like'), data[1].addListFavor(data[0])])
                }
                else if(req.query.classify == 'decrement'){
                    return Promise.all([data[0].decrement('like'), data[1].removeListFavor(data[0])])
                }
            })
            .then(result => {
                res.status(200).json({data: result});
            });
    },
    //params.id
    createComment(req, res){
        const data = req.body.data;

        db.Comment.create(data)
            .then(data => {
                res.json({
                    data: data
                })
            })
    },
    //params.id, query.classify
    likeComment(req, res){
        const classify = req.query.classify;

        Promise.all([db.Comment.findOne({where: {id: req.params.id}}), db.User.findOne({where: {id: req.user.id}})])
            .then(data => {
                if(classify == 'increment'){
                    return Promise.all([data[0].increment('like'), data[1].addCommentFavor(data[0])])
                }
                else if(classify == 'decrement'){
                    return Promise.all([data[0].decrement('like'), data[1].removeCommentFavor(data[0])])
                }
            })
            .then(result => {
                res.status(200).json({data: result});
            });
    },
    //multer config for upload image
    multerConfig: multer({ storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(config.path.public, '/thumbnails'))
        },
        filename: (req, file, cb) => {
            crypto.pseudoRandomBytes(16, (err, raw) => {
                if (err) return cb(err);
                cb(null, raw.toString('hex') + path.extname(file.originalname));
            })
        }
    })}).single('thumbnail')
}