export default class List {
    constructor($resource, $q, $rootScope, Upload, Session) {
        angular.extend(this, { $q, Upload });
        this.listRequest = $resource('/list');
        this.songRequest = $resource('/list/song/:id', { id: '@id' });
        this.likeRequest = $resource('/list/like/:id', { id: '@id', classify: '@classify' }, { post: { method: 'POST' } });
        this.musicList = [];
        this.order = 0; // 'md-selected directive' get index of 'tab'. (0: createdAt, 1: like)
        this.searchWord = "";
        this.searchScope = "listname";

        // config for created list
        this.listForm = {};
        this.createdList = [];
        this.createdListNumPerPage = 7;
        this.createdListcurrentPage = 1;

        $rootScope.$watchCollection(() => Session, (newVal, oldVal) => {
            let listKey = Session.user.list.map(element => element.id);

            for (const index in this.musicList) {
                this.musicList[index].isLike = listKey.indexOf(this.musicList[index].id) != -1;
            }
        }
        );
        $rootScope.$watchCollection(() => this.musicList, (newVal, oldVal) => {
            let listKey = Session.user.list.map(element => element.id);

            for (const index in newVal) {
                this.musicList[index].isLike = listKey.indexOf(newVal[index].id) != -1;
            }
        }
        );
    }
    load(count) {
        const q = this.$q.defer();
        let order;

        switch (this.order) {
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
            order: order,
            word: this.searchWord,
            scope: this.searchScope
        }, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
        return q.promise;
    }
    loadDetail(id) {
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
    create(data) {
        const q = this.$q.defer();
        const spec = { url: '/list', data: data, method: 'POST' };

        if (data.thumnail) {
            this.Upload.resize(data.thumbnail, { width: 320, height: 240 })
                .then(resizedImg => {
                    data.thumbnail = resizedImg;
                    return this.Upload.upload(spec);
                })
                .then(result => {
                    q.resolve(result);
                }, err => {
                    q.reject(err);
                });
        }
        else {
            this.Upload.upload(spec)
                .then(result => {
                    q.resolve(result);
                }, err => {
                    q.reject(err);
                });
        }

        return q.promise;
    }
    edit(data, ListId) {
        const q = this.$q.defer();
        const spec = { url: '/list/' + ListId, data: data, method: 'PUT' };

        if (data.thumnail) {
            this.Upload.resize(data.thumbnail, { width: 320, height: 240 })
                .then(resizedImg => {
                    data.thumbnail = resizedImg;
                    return this.Upload.upload(spec);
                })
                .then(result => {
                    q.resolve(result);
                }, err => {
                    q.reject(err);
                });
        }
        else {
            this.Upload.upload(spec)
                .then(result => {
                    q.resolve(result);
                }, err => {
                    q.reject(err);
                });
        }

        return q.promise;
    }
    validation(list) {
        let message;

        if (list.$valid) {
            message = 'valid';
        }
        else if ('required' in list.name.$error) {
            message = '이름을 입력해 주세요';
        }
        else if ('md-maxlength' in list.name.$error) {
            message = '이름이 너무 깁니다';
        }
        else if ('required' in list.content.$error) {
            message = '소개를 입력해 주세요';
        }
        else if ('md-maxlength' in list.content.$error) {
            message = '소개가 너무 깁니다.';
        }
        return message;
    }
    initForm() {
        this.listForm = {};
        this.createdList = [];
    }
    like(id, classify) {
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