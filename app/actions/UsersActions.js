
'use strict';

import * as types from './actionTypes';
import * as api from '../network/Api';

function setData(type, data) {
	return {
		type,
		data
	};
}
//获取热门歌单
function setHotMusic(type, data) {
    return {
        type,
        data
    };
}
//获取热门歌单中
function setMusicList(type, data) {
    return {
        type,
        data
    };
}


export const UserInfo = (id, params, callback) => {
    return (dispatch, getState) => {
        return (async () => {
            try {
            	dispatch(setData(types.SET_USER_INFO, null));
                var data = await api.UserInfo(10001, params, callback);

                dispatch(setData(types.SET_USER_INFO, data));
            } catch (e) {
                console.log('err ==== ' + JSON.stringify(e));
            }
        })();
    };
};
//获取热门歌单
export const HotSongList = ( params, callback) => {
    return (dispatch, getState) => {
        return (async () => {
            try {
                dispatch(setHotMusic(types.SET_HOT_SONGLIST, null));
                var data = await api.HotSongList(params, callback);
                dispatch(setHotMusic(types.SET_HOT_SONGLIST, data));
            } catch (e) {
                console.log('err ==== ' + JSON.stringify(e));
            }
        })();
    };
};
//GetMusicList 获取歌单中的歌曲
export const GetMusicList = ( params, callback) => {
    return (dispatch, getState) => {
        return (async () => {
            try {
                dispatch(setMusicList(types.SET_MUSIC_LIST, null));
                var data = await api.GetMusicList(params, callback);
                dispatch(setMusicList(types.SET_MUSIC_LIST, data));
            } catch (e) {
                console.log('err ==== ' + JSON.stringify(e));
            }
        })();
    };
};


