/**
 * ScreenBottomTab/index.js
 */
import  { createBottomTabNavigator } from 'react-navigation'

import FindMusic from './findmusic';
import MyMusic from './mymusic';
import Friend from './friend';
import Account from './account';
import { Dimensions } from 'react-native';

const {height, width} =  Dimensions.get('window');
const ScreenTab = createBottomTabNavigator({
        FindMusic: {screen: FindMusic}, 
        MyMusic: { screen: MyMusic },
        Friend: { screen: Friend },
        Account: { screen: Account },
    },{
        swipeEnabled: true,
        animationEnabled: true,
        initialRouteName: 'FindMusic',
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#CD3700',
            inactiveTintColor: '#cccccc',
        }
    }
);

ScreenTab.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    switch(routeName){
        case "FindMusic":
            console.log(FindMusic.headersFind);
            return FindMusic.headersFind;
        case "MyMusic":
            console.log(MyMusic.headersFind);
            return MyMusic.headersFind;
        case "Friend":
            console.log(Friend.headersFind);
            return Friend.headersFind;
        case "Account":
            console.log(Account.headersFind);
            return Account.headersFind;
        default:
            return {routeName};
    };
};

export default ScreenTab;