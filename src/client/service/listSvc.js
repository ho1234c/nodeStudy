export default class List {
    constructor($resource, $q, $rootScope, Upload, Session) {
        angular.extend(this, {$q, $rootScope, Upload, Session});
        this.listRequest = $resource('/list');
        this.songRequest = $resource('/list/song/:id', { id: '@id' });
        this.likeRequest = $resource('/list/like/:id', { id: '@id', classify: '@classify' },
            { post:
                { method: 'POST'}
            });
        this.musicList = [];

        this.$rootScope.$watchCollection(() => this.Session, (newVal, oldVal) => {
            let listKey = this.Session.user.list.map(element => element.id);
            for(const index in this.musicList) {
                this.musicList[index].isLike = listKey.indexOf(this.musicList[index].id) != -1;
            }});
        this.$rootScope.$watchCollection(() => this.musicList, (newVal, oldVal) => {
            let listKey = this.Session.user.list.map(element => element.id);
            for(const index in newVal) {
                this.musicList[index].isLike = listKey.indexOf(newVal[index].id) != -1;
            }});

        this.order = 0; // md-selected directive가 tab의 index를 가져옴. 0: createdAt, 1: like

        // created list config
        this.listForm = {};
        this.createdList = [];
        this.pageNum = 7;
        this.currentPage = 1;
    }
    loadList(count){
        const q = this.$q.defer();
        let order;

        switch(this.order){
            case 0:
                order = 'createdAt';
                break;
            case 1:
                order = 'like';
                break;
            default:
                order = 'createdAt';
        }
        this.listRequest.get({
            count: count,
            order: order
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
    loadSong(id){
        const q = this.$q.defer();
        this.songRequest.get({
            id: id
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
    create(data){
        const q = this.$q.defer();
        if(data.thumnail){
            this.Upload.resize(data.thumbnail, {width:320, height: 240})
                .then(resizedImg => {
                    data.thumbnail = resizedImg;
                    return this.Upload.upload({
                        url: '/list',
                        data: data
                    });
                })
                .then(result => {
                    q.resolve(result);
                }, err => {
                    q.reject(err);
                });
        }
        else{
            this.Upload.upload({
                url: '/list',
                data: data
            }).then(result => {
                    q.resolve(result);
                }, err => {
                    q.reject(err);
                });
        }

        return q.promise;
    }
    validation(list){
        let message;

        if(list.$valid){
            message = 'valid';
        }
        else if('required' in list.name.$error){
            message = '이름을 입력해 주세요';
        }
        else if('md-maxlength' in list.name.$error){
            message = '이름이 너무 깁니다';
        }
        else if('required' in list.content.$error){
            message = '소개를 입력해 주세요';
        }
        else if('md-maxlength' in list.content.$error){
            message = '소개가 너무 깁니다.';
        }
        return message;
    }
    initForm(){
        this.listForm = {};
        this.createdList = [];
    }
    like(id, classify){
        const q = this.$q.defer();
        this.likeRequest.post({
            id: id,
            classify: classify
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
}

List.$inject = ['$resource', '$q', '$rootScope', 'Upload', 'Session'];