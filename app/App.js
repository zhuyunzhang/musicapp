// app 入口

'use strict';

import React, { Component } from 'react';

import Router from './Router';
// import Views from './Views';

// global.app = global.app || {...Views};

// 添加 redux 支持
import {
	createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import {
	Provider,
} from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
	render () {
		return (
			<Provider store={store}>
				<Router/>
			</Provider>
		);
	}
}