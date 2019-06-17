//
// Author: leafsoar
// Date: 2016-07-09 11:10:09
// 

'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
	user_info: null,
	hot_music:null,
	music_list:null,
	music_indo:null,
};

export default function user(state = {}, action = {}) {
	//SET_MUSIC_INFO
	switch(action.type) {
	case types.SET_USER_INFO:
		return Object.assign(
            {}, state,
            {user_info: action.data}
        );
    case types.SET_HOT_SONGLIST:
		return Object.assign(
            {}, state,
            {hot_music: action.data}
        );
    case types.SET_MUSIC_LIST:
		return Object.assign(
            {}, state,
            {music_list: action.data}
        );
    case types.SET_MUSIC_INFO:
		return Object.assign(
            {}, state,
            {music_indo: action.data}
        );
	default:
		return state;
	}
}
