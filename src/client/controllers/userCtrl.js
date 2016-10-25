export default class signInController {
    constructor(User) {
        angular.extend(this, { User });

    }
}

signInController.$inject = ['User'];