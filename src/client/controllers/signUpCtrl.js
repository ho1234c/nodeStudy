export default class signUpCtrl {
    constructor(User) {
        angular.extend(this, { User });
    }
}

signUpCtrl.$inject = ['User'];