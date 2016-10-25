export default class User {
    constructor($resource, $q) {
        angular.extend(this, {$q});
        this.userRequest = $resource('user/:controller', {
            controller: '@controller',
        }, {
            login: { method: 'POST', params: { controller: 'login' }},
            logout: { method: 'GET', params: { controller: 'logout' }},
            create: { method: "POST", params: { controller: 'create' }}
        });
    }
    login({email, password}) {
        const delay = this.$q.defer();

        this.userRequest.login({ email, password }, result => {
            delay.resolve(result);
        }, err => {
            delay.reject(err);
        });

        return delay.promise;
    }
    logout() {
        const delay = this.$q.defer();

        this.userRequest.logout(result => {
            delay.resolve(result);
        }, err => {
            delay.reject(err);
        });

        return delay.promise;
    }
}

User.$inject = ['$resource', '$q'];