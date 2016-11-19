export default class krInput {
    constructor(){
        this.priority = 2;
        this.restrict = 'A';
    }
    compile(element){
        element.on('compositionstart', e => {
            e.stopImmediatePropagation();
        });
    }
}
krInput.$inject = ['$parse'];