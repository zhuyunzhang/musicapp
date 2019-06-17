import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import { Button,Icon} from '@ant-design/react-native';
import SplashScreen from "react-native-splash-screen"; 
import * as action from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TabsIndex from './tabsindex';

const {height, width} =  Dimensions.get('window');
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
let self;
class findmusic extends Component {

    constructor(props) {
        super(props);
        self = this;
        this.state = {
            visible: true,
            selected: '',
            text:null,
        };
        // this.navigation = props.navigation;
    }
    componentDidMount() {
        // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);
    }
    
    static headersFind={

        headerTitle: (
             <TextInput 
             style={{textAlign: 'center' ,borderRadius: 30, fontSize:14, backgroundColor: '#ffffff',width: width / 3 * 2 , height:width / 10}}
             placeholder ="搜索音乐、歌词、电台"//
             placeholderTextColor="#E8E8E8"//
             onChangeText={(value) => self.setState({text:value})}
             /> 
        ),
        headerStyle: {
            backgroundColor: '#CD3700',
            height :height/15
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            flex:1,
            textAlign: 'center' 
        },
        //onPress={() => this.onPressWallet(item.pay_money)}
        headerRight:(
            <View> 
                <TouchableOpacity onPress={() => self.onPressFindMusic()}>
                    <Icon name="search" size={30} style={{color:'#FFFFFF',marginRight:width / 16}}/>
                </TouchableOpacity>
            </View>
        ),
        // headerLeft:(
        //     <View>    
        //         <TouchableOpacity onPress={() => self.onPressFindMusic()}>
        //             <Icon name="bar-chart" size={30} style={{color:'#FFFFFF',marginLeft:width / 16}}/>
        //         </TouchableOpacity>
        //     </View>
        // )  
    };

    static navigationOptions = {
        title: '发现音乐',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon name="radar-chart" size={30} color={tintColor} />
        )
    };
     onPressFindMusic(){
        const{navigation}=this.props;
        if(navigation){
            navigation.navigate('SearchMusic',{search:this.state.text}) 
        }
     }
    onChange = (value) => {
        this.setState({ value });
    }


    render() {
        const { actions, state, navigation } = this.props;
        return (
            <View style={styles.container}>
                <TabsIndex props={this.props}/>
            </View>
        );
    }
}

export default connect(state => ({
    state: state.user
}), (dispatch) => ({
    actions: bindActionCreators(action.user, dispatch)
}))(findmusic);

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }

};