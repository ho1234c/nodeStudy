import config from '../config'

// JSON data search를 위한 함수. key를 obj안에서 찾는다.
export function findNode(targetKey, obj){
    if(typeof obj != 'object'){
        return false;
    }
    if (targetKey in obj){
        return obj[targetKey]
    }
    for(let key in obj){
        if(typeof obj[key] == 'object'){
            return findNode(targetKey, obj[key]);
        }
    }
}

export function createUrl(url, args){
    let params = [];

    for(const key in args){
        params.push(key + '=' + args[key]);
    }
    return url + params.join('&');
}

// protect from unauthorized access
export function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.status(401).send('Unauthorized');
}