import React, { Component } from 'react';
import {
    Image,
    Button,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView
} from 'react-native';

var {height,width} =  Dimensions.get('window');

import * as action from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Tabs } from '@ant-design/react-native';
import Recommend from './recommend';
const style = {
    paddingVertical: 3,
    margin: 5,
    backgroundColor: '#FCFCFC',
};
class TabsIndex extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }


    render() {
        const tabs = [
          { title: '个性推荐' },
          { title: '歌单' },
          { title: '主播电台' },
          { title: '排行榜' },
        ];
        return (
            <View style={{ flex: 1 }}>
                <Tabs tabs={tabs} tabBarUnderlineStyle={{backgroundColor:'red'}}>
                    <ScrollView style={style}> 
                        <View>              
                            <Recommend props={this.props.props}/>
                        </View>
                    </ScrollView>
                    <ScrollView style={style}>
                        <Text>歌单</Text>
                    </ScrollView>
                    <ScrollView style={style}>
                        <Text>主播电台</Text>
                    </ScrollView>
                    <ScrollView style={style}>
                        <Text>排行榜</Text>
                    </ScrollView>
                </Tabs>
            </View>
        );
    }
}

export default connect(state => ({
	state: state.user
}), (dispatch) => ({
	actions: bindActionCreators(action.user, dispatch)
}))(TabsIndex);

const styles = StyleSheet.create({
});