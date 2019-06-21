
// 引入依赖
import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'

// 引入页面组件
import ScreenBottomTab from './Views';
import Player from './player/player';
import PlayList from './player/playlist';
import SearchMusic from './findmusic/searchmusic';
import UserSurvey from './mymusic/UserSurvey';

//UserSurvey

/**
 * 自定义 StackNavigator，可以选择 screen 进入方式
 * 默认状态为 card，只需要输入对应页面，比如 ..navigate('ScreenSome1')
 * 如果要使某个页面进入方式为 modal 只需要在路径上加上 Modal
 * 比如：..navigate('ScreenSome2Modal')
 */
const StackModalNavigator = (routeConfigs, navigatorConfig) => {
  const CardStackNavigator = createStackNavigator(routeConfigs, navigatorConfig);
  const modalRouteConfig = {};
  const routeNames = Object.keys(routeConfigs);

  for (let i = 0; i < routeNames.length; i++) {
    modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]];
  }

  const ModalStackNavigator = createStackNavigator(
    {
      CardStackNavigator: { screen: CardStackNavigator },
      ...modalRouteConfig,
    },
    {
      // 如果页面进入方式为 modal，需要自定义 header（默认 header 样式失效，都叠在一块了）
      mode: 'modal',
      headerMode: 'none',
    },
  );

  return ModalStackNavigator;
};


// 配置路由
const AppNavigator = StackModalNavigator({
  ScreenBottomTab: ScreenBottomTab,
  //下面几个配置的是测试Navigator不同使用场景用，只需要tab的话，只要ScreenBottomTab: ScreenBottomTab即可
  Player:{screen: Player }, 
  SearchMusic:{screen: SearchMusic },
  UserSurvey:{screen: UserSurvey },
  PlayList:{screen:PlayList},
});
const App = createAppContainer(AppNavigator)
export default App


