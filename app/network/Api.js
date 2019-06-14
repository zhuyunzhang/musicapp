var api = {
	API_ROOT: "https://v1.itooi.cn",
	API_TOKEN: ""
};

export function setToken(token) {
    console.log('set token: ' + token);
    api.API_TOKEN = token;
}

export function getToken(token) {
    // console.log('set token: ' + token);
    return api.API_TOKEN;
}
export function getRoot() {
    // console.log('set token: ' + token);
    return api.API_ROOT;
}

// 获取用户信息
export function UserInfo(id, params, callback) {
    return getRequest(`/users/${id}`, params, callback);
}

// 获取热门歌单
export function HotSongList( params, callback) {
    return getRequest(`/netease/songList/hot`, params, callback);
}
//获取歌单中的歌曲
export function GetMusicList( params, callback) {
    return getRequest(`/netease/songList`, params, callback);
}
function getRequest(url, params) {
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

    return new Promise(function (resolve, reject) {
        fetch(curl, context)
            .then(response => {
                var status = response.status;
                if (status >= 200 && status <= 204) {
                    // 请求成功
                    return response.text();
                } else if (status >= 400 && status <= 404) {
                    var msg = JSON.parse(response._bodyText).msg;
                    reject(msg);
                    // 权限问题，直接跳转到登录
                    const routers = app.nav.getCurrentRoutes();
                    if (routers.length > 0 && routers[0].name != "Login") {
                        // api.API_TOKEN = '';
                        // app.nav.resetTo({name: 'Login'});
                    }
                } else {
                    reject("未知错误!" + response._bodyText);
                }
                return null;
            })
            .then(body => {
                if (body) {
                    resolve(JSON.parse(body));
                }
            })
            .catch(error => {
                reject(error);
            });
    });
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
    request(turl,callback,context);
}

function request(url,callback,context){
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
