import config from '../config'

// JSON data search를 위한 함수
export function findNode(target, obj){
    if (target in obj){
        return obj[target]
    }
    for(let key in obj){
        if(typeof obj[key] == 'object'){
            return findNode(target, obj[key]);
        }
    }
}