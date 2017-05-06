import nprogress from 'nprogress';

export function httpInterceptors($q) {
    return {
        request(req) {
            nprogress.start();
            return req || $q.when(req);
        },
        requestError(req) {
            return $q.reject(req);
        },
        response(res) {
            nprogress.done();
            return res || $q.when(res);
        },
        responseError(res) {
            let reject = res.data.message;
            nprogress.done();
            return $q.reject(reject);
        }
    };
}
httpInterceptors.$inject = ['$q'];

export class Session {
    constructor($http) {
        this.guest = { id: null, nickname: 'Guest', email: '@', list: [], comment: [] };
        this.isLogin = false;
        this.user = {};
        this.init = $http.get('/session')
            .then(res => {
                if (res.data.user) {
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
    constructor($mdToast, $q) {
        angular.extend(this, { $mdToast, $q });

        this.simple = this.$mdToast.simple()
            .position('top')
            .hideDelay(700);
    }
    success(message) {
        const q = this.$q.defer();

        this.$mdToast.show(
            this.simple
                .textContent(message)
                .theme("success-toast")
                .parent(angular.element(document.querySelector('#wrap'))))
            .then(() => {
                q.resolve();
            })
            .catch(() => {
                q.reject();
            });
        return q.promise;
    }

    fail(message) {
        const q = this.$q.defer();

        this.$mdToast.show(
            this.simple
                .textContent(message)
                .theme("fail-toast")
                .parent(angular.element(document.querySelector('#wrap'))))
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