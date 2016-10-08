class signUpController {
    constructor() {
        this.name = 'signUpCtrl';
        console.log('sign-up controller init');
    }

    getName() {
        return this.name;
    }

    changeName(name) {
        this.name = name;
        return name;
    }
}

module.exports = signUpController;
