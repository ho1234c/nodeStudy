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
