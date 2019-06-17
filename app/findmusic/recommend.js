import React, { Component } from 'react';
import {
    Image,
    Button,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Carousel ,Icon} from '@ant-design/react-native';
import * as action from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import IconMenu from '../widgets/IconMenu';

var {height,width} =  Dimensions.get('window');
const cols = 3;
const vMargin = 20;
const cellWH = (width-2*vMargin-15)/cols;
const hMargin = 25;

let self;
class Recommend extends Component {
    constructor(props) {
        super(props);
        self = this;
        this.navigation = props.navigation;
    }
    componentDidMount() {
        this.parms={
            'pageSize':6,
            'page':0,
        }
        const {actions, state} = this.props;
        actions.HotSongList(this.parms)
    }
    onPressPersonFM(){
        Alert.alert("=======>个人FM")
    }
    onPressMusicRank(){
        Alert.alert("=======>每日歌曲推荐")
    }
    onPressHotMusic(){
        Alert.alert("=======>热搜榜")
    }
    onPressSongSheet(id){
        const{navigation}=this.props.props;

        if(navigation){
            navigation.navigate('Player',{songid:id,id:1}) 
        }     
    }
    renderItem({item, index})  {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{self.onPressSongSheet(item.songid)}}>
                <View style={styles.item}>
                    <Image source={{uri: item['image']}} style={{width: cellWH,height:cellWH, borderRadius: 2}}/>
                    <View style={{zIndex:999,width:80,height:24,position:'absolute',right:8,top:10,backgroundColor:'rgba(178,178,178,0.5)',justifyContent: 'center',}}>
                        <Text style={{right:10,top:6,position:'absolute',color:'white',fontSize:12,fontWeight:'bold'}}>🔥{item.share}万</Text>
                    </View>
                    <Icon name="caret-right" style={{right:5,top:cellWH-30,position:'absolute',color:'white'}}/>
                    <Text style={{marginTop: 5, textAlign: 'center'}} numberOfLines={2}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        const { actions, state, navigation } = this.props;
        const {hot_music} = state;
        var data=null;
        if(hot_music!=null){
            data = Array.from(new Array(6)).map((_val, i) => ({
              image: hot_music.data[i].creator.backgroundUrl,
              title: hot_music.data[i].name,
              songid: hot_music.data[i].id,
              share:(hot_music.data[i].playCount/10000).toFixed(2),
            }));
        }
        return (
            <View>
                <Carousel
                    style={styles.wrapper}
                    selectedIndex={2}
                    autoplay
                    infinite
                    afterChange={this.onHorizontalSelectedIndexChange}
                >
                    <View
                      style={styles.containerHorizontal}
                    >
                        <Image source={require('../images/banner1.jpeg')} style={styles.banners}/>
                    </View>
                    <View
                      style={styles.containerHorizontal}
                    >
                        <Image source={require('../images/banner2.jpeg')} style={styles.banners}/>
                    </View>
                    <View
                      style={styles.containerHorizontal}
                    >
                        <Image source={require('../images/banner3.jpeg')} style={styles.banners}/>
                    </View>
                    <View
                      style={styles.containerHorizontal}
                    >
                        <Image source={require('../images/banner4.jpeg')}  style={styles.banners}/>
                    </View>
                    <View
                      style={styles.containerHorizontal}
                    >
                        <Image source={require('../images/banner5.jpeg')} style={styles.banners}/>
                    </View>
                    <View
                      style={styles.containerHorizontal}
                    >
                        <Image source={require('../images/banner6.jpeg')} style={styles.banners}/>
                    </View>
                </Carousel>
                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', height: width / 4}}>
                    <TouchableOpacity onPress={() => this.onPressPersonFM()}>
                        <IconMenu icon="md-radio" title="私人FM" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPressMusicRank()}>
                        <IconMenu icon="md-calendar" title="每日歌曲推荐" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPressHotMusic()}>
                        <IconMenu icon="md-stats" title="云音乐热歌榜" />
                    </TouchableOpacity>
                </View>
                <View style={[{ margin: 10 }]}>
                    <Text>推荐音乐></Text>
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={data}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        contentContainerStyle={styles.list_container}
                    />
                </View>
            </View>
        );
    }
}

export default connect(state => ({
	state: state.user
}), (dispatch) => ({
	actions: bindActionCreators(action.user, dispatch)
}))(Recommend);

const styles = StyleSheet.create({
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
    },
    banners:{
        width:width-10,
        height:120
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 15,
    },
    list_container: {
        // 主轴方向
        flexDirection:'row',
        justifyContent: 'space-between',
        // 一行显示不下,换一行
        flexWrap:'wrap',
        // 侧轴方向
        alignItems:'center', // 必须设置,否则换行不起作用
        paddingHorizontal: 10,
    },
    item: {
        width:cellWH,
        marginTop:5,
        alignItems: 'center',
    }
});