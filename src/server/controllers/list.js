import db from '../models';
import config from '../config';
import multer from  'multer';
import crypto from 'crypto';
import path from 'path';

export default {
    //query.count
    load(req, res){
        const count = req.query.count || 0;
        const order = req.query.order || 'createdAt';

        db.List.findAll({
            attributes: ['id', 'name', 'detail', 'like', 'createdAt', 'thumbnail'],
            order: [[order, 'DESC']],
            offset: count,
            limit: 10,
            include: {model: db.User, attributes: ['email', 'nickname']},
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
        data.thumbnail = req.file.filename;
        data.songInfo = JSON.stringify(data.songInfo);
        db.List.create(data)
            .then(result => {
                res.status(200).json(result);
            })
    },
    //:listId
    like(req, res){

    },
    //:listId
    createComment(req, res){

    },
    //multer config to image upload
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