/**
 * index.js
 * 更改为持久化存储
 */
import {StatusBar, AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';

StatusBar.setBarStyle('light-content', true);
AppRegistry.registerComponent(appName, () => App);