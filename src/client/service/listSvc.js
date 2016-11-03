export default class List {
    constructor($resource, $q) {
        angular.extend(this, {$q});
        this.listRequest = $resource('load/list');
        this.songRequest = $resource('load/song/:id', {
            id: '@id'
        });

        this.musicList = [];

        // created list config
        this.listForm = {};
        this.createdList = [];
        this.pageNum = 7;
        this.currentPage = 1;
    }
    loadList(count){
        const q = this.$q.defer();
        this.listRequest.get({
            count: count
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
        this.listRequest.save(data, result => {
            q.resolve(result);
        }, err => {
            q.reject(err);
        });
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
}

List.$inject = ['$resource', '$q'];