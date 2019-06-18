import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    Dimensions
} from 'react-native';
import { Button,Icon} from '@ant-design/react-native';
import SplashScreen from "react-native-splash-screen"; 

import * as action from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const {height, width} =  Dimensions.get('window');
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
const self = this;
class mymusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: '',
        };
        
    }
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);
    }
    
    static headersFind={
        headerTitle: '我的音乐',
        headerStyle: {
            backgroundColor: '#CD3700',
            height :height/15
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            
            flex:1,
            textAlign: 'center'
        }
    };

    static navigationOptions = {
        title: '我的音乐',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name="reddit" size={25} color={tintColor} />
        )
    };
    onPressUserSurvey(){
      const{navigation}=this.props;
      if(navigation){
         navigation.navigate('UserSurvey') 
      }
    } 

    render() {
       
        const onPressUserSurvey = () => {
            const {navigation } = this.props;
            if(navigation){
                navigation.navigate('UserSurvey') 
            }
        }
        return (
            <View style={styles.container}>
                <Button type="primary" onPress={onPressUserSurvey}>这是测试按钮</Button>
            </View>
        );
    }
}

export default connect(state => ({
	state: state.user
}), (dispatch) => ({
	actions: bindActionCreators(action.user, dispatch)
}))(mymusic);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
};