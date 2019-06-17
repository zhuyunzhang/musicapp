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
    
    onChange = (value) => {
        this.setState({ value });
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            selected: '',
        };
        // this.navigation = props.navigation;
    }
           // headerTitle: (
        //      <TextInput 
        //      style={{textAlign: 'center' ,borderRadius: 30, fontSize:14, backgroundColor: '#ffffff',width: width / 3 * 2 , height:width / 10}}
        //      placeholder ="搜索音乐、歌词、电台"//
        //      placeholderTextColor="#E8E8E8"//
        //      onChangeText={(value) => self.setState({text:value})}
        //      /> 
        // ),

    render() {
        const { actions, state, navigation } = this.props;
        return (
            <View style={styles.container}>

                <Button type="primary">这是测试按钮</Button>
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