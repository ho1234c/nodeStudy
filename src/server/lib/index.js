import config from '../config'

export function findNode(target, obj){
    for(let key in obj){
        if (key == target){
            return obj[key]
        }
        if(typeof obj[key] == 'object'){
            return findNode(target, obj[key]);
        }
    }
}