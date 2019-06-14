//
// Author: leafsoar
// Date: 2016-07-12 10:29:34
//

'use strict';


api.API_ROOT = "";

// if (c.debugUrl) {
//     api.API_ROOT = c.debugHost;
// }

// export function getHost() {
//     return api.API_ROOT;
// }

export function setToken(token) {
    console.log('set token: ' + token);
    api.API_TOKEN = token;
}

export function getToken(token) {
    // console.log('set token: ' + token);
    return api.API_TOKEN;
}

export function getUser(id, params, callback) {
    return getRequest('/users/'+id, null, callback);
}

function getRequest(url, params, callback) {
    var curl = getUrl(url, params);
    console.log('get request:' + curl);
    var context = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + api.API_TOKEN
        },
        method: 'GET'
    };
    return request(turl, callback, context);
}

function post(url, data, callback){
    console.log(data);
    let turl = getUrl(url,null);
    console.log('post request:' + turl);
    let context = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + api.API_TOKEN
        }
    };
    return request(turl, callback, context);
}

function request(url,callback,context){
    return new Promise(function (resolve, reject) {
    fetch(url, context).
        then((response) => {
            const status = response.status;
            if (status === 401) {
                setToken('');
            }
            if (status >= 200 && status <= 204) {
                // 如果是正常返回，往下传数据
                return response.text();
            } else if (status >= 400 && status < 404) {
                response.text().then((text)=>{
                    const msg = JSON.parse(text).msg;
                    callback(false, msg);
                });
            } else {
                callback(false, "未知错误");
            }
            return null;
        }).
        then((body) => {
            if (body) {
                callback(true, JSON.parse(body));
            }
        }).
        catch((error) => {
            callback(false, JSON.stringify(error));
        });
    });
}

function getUrl(url,params){
    let ret = api.API_ROOT + url;
    let paramstr= paramsStr(params);
    if(paramstr.length>0){
        ret = ret + '?' + paramstr;
    }
    // console.log(ret);
    return ret;
}

function paramsStr(params){

    let paramstr = '';
    let param = params || {};
    if(param){
        let i = 0;
        for (let p in param) {
            if(i>0){
                paramstr += '&';
            }
            paramstr += p + '=' + encodeURI(params[p]);
            i += 1;
        };
    }
    return paramstr;
}
