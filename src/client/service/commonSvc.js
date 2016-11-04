import nprogress from 'nprogress';

export class httpInterceptors {
    constructor($q){
        angular.extend(this, {$q});
    }
    request(req){
        nprogress.start();
        return req || this.$q.when(req);
    }
    requestError(){
        console.log('req err');
    }
    response(res){
        nprogress.done();
        return res || this.$q.when(res);
    }
    responseError(){
        console.log('res err');
        nprogress.done();
    }
}
httpInterceptors.$inject = ['$q'];

export class Session {
    constructor($http) {
        this.guest = { id: null, name: 'Guest', email: '@', list: [] };
        this.isLogin = false;
        this.user = {};
        $http.get('/session')
            .then((res) => {
                if(res.data.user){
                    this.set(res.data);
                }
                else {
                    this.user = this.guest;
                }
            });
    }
    set(data) {
        if (!data) {
            return false;
        }
        this.isLogin = true;
        this.user = data.user;
        return data;
    }
    destroy() {
        this.isLogin = false;
        this.user = this.guest;
    }
}
Session.$inject = ['$http'];

export class Toast {
    constructor($mdToast, $q){
        angular.extend(this, {$mdToast, $q});

        this.simple = this.$mdToast.simple()
            .position('top')
            .hideDelay(700);
    }
    success(message){
        const q = this.$q.defer();

        this.$mdToast.show(
            this.simple
                .textContent(message)
                .theme("success-toast")
                .parent(angular.element(document.querySelector('#id-box'))))
            .then(() => {
                q.resolve();
            })
            .catch(() => {
                q.reject();
            });
        return q.promise;
    }

    fail(message){
        const q = this.$q.defer();

        this.$mdToast.show(
            this.simple
                .textContent(message)
                .theme("fail-toast")
                .parent(angular.element(document.querySelector('#id-box'))))
            .then(() => {
                q.resolve();
            })
            .catch(() => {
                q.reject();
            });
        return q.promise;
    }
}

Toast.$inject = ['$mdToast', '$q'];