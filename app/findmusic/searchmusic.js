import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    SectionList
} from 'react-native';
import * as action from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as api from '../network/Api';
import {ActivityIndicator,ListView} from '@ant-design/react-native';
import {commonStyle} from '../player/commonStyle'
import {Icon} from '../icon'
import { color } from '../widgets/color';
import  {Normal,Tip,H3}  from '../widgets/TextTool';
import  Avatar from '../widgets/Avatar';
import  IconWidget from '../widgets/IconWidget';


var {height,width} =  Dimensions.get('window');
var mockData=null;
class SearchMusic extends Component {
    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state={
            musicInfo:null,
            loading:false,
            refreshing: true,
            dataList: [],
        }
    }
    componentDidMount() {
        this.requestDetail();
      
    }
    static navigationOptions = {
        header:null,
        gesturesEnabled: false,
        // headerStyle: {
        //     backgroundColor: 'red'
        // },
    };
    backPrevious(){
      const{navigation}=this.props;
      if(navigation){
        mockData=null;
        navigation.goBack();
      }
    } 


    requestDetail = () => {
       const { actions, state } = this.props;
            var search=this.props.navigation.state.params.search;

            // const {music_indo} = state;
            this.param={
                'keyword':search,
                'type':'song',
                'pageSize':20,
                'page':0,
            }
            // var datas=actions.SearchMusicInfos(this.param)
            var url ='/netease/search'
            var curl = api.getUrls(url, this.param);
            fetch(curl, {  
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'GET'
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                  musicInfo:responseJson.data,
                }, () => {
                  mockData=this.state.musicInfo;
                  this.setState({
                    loading:false,
                    dataList:mockData.songs.map(v => ({...v, title: v.name + ((v.alia && v.alia.length > 0) ? `(${v.alia})` : ''), subTitle: (v.ar || v.artists).map(a => a.name).join('、') + ' - ' + (v.al || v.album).name})),
                  })
                })
                
            }).catch(error => {
                console.log("========>>网络错误")
                console.log(error)
            });
    };
    // goBack = () => {
    //     const backAction = NavigationActions.back({key: 'Tab'});
    //     console.log(backAction);
    //     this.props.navigation.dispatch(backAction);
    // };
    playSong = id => {
        console.log("playSong========>>"+id);
        // const { dispatch, navigation } = this.props;
        // dispatch(setPlayId(id));
        // navigation.navigate('Player', {title: '播放器'})
    };
    scrollToLocation = (params) => {
        console.log("scrollToLocation======>>>"+params)
    };
    toUserPage = id => {
        console.log("toUserPage=======>>>"+id);
        // this.props.navigation.navigate('UserDetail', {id})
    };
    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Image source={{uri: mockData.songs[0].al.picUrl}} resizeMode="cover" style={[styles.bg, {top: -50, height: width * 0.6 + 50,}]} blurRadius={4} />
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, backgroundColor: 'transparent'}}>
                    <View style={{width: width * 0.3, height: width * 0.3}}>
                        <Image source={{uri: mockData.songs[0].al.picUrl}} style={{width: '100%', height: '100%'}}/>
                    </View>
                    <View style={{flex: 1, marginLeft: 15, height: '80%'}}>
                        <H3 style={{paddingTop: 15, paddingBottom: 10}} color={commonStyle.white}>最新音乐搜索排行</H3>
                        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.toUserPage(1)}>
                            <Avatar img={{uri: mockData.songs[0].al.picUrl}} size={30} />
                            <Normal style={{paddingVertical: 10, paddingHorizontal: 10}} color={commonStyle.white}>歌曲:{mockData.songs[0].name}</Normal>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 50, justifyContent: 'space-around', flexDirection: 'row', backgroundColor: 'transparent', paddingTop: 10, alignItems: 'center'}}>
                    <IconWidget icon="ios-star-outline" color={commonStyle.white} title={'喜欢'} />
                    <IconWidget icon="ios-checkbox-outline" color={commonStyle.white} title={'留言'} />
                    <IconWidget icon="ios-share-alt" color={commonStyle.white} title={'分享'} />
                    <IconWidget icon="ios-code-download" color={commonStyle.white} title={'下载'} />
                </View>
            </View>
        )
    };
    renderItem = ({item, index}) => {
        return (
            <View style={{height: 50, width: width, flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
                <View style={{ width: 25, justifyContent: 'center', alignItems: 'center'}}>
                    {
                        <Tip title={index + 1} style={{fontSize: 12}} />
                    }
                </View>
                <View style={{flex: 1, flexDirection: 'row',alignItems: 'center', height: '100%', marginLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderColor: '#F0F0F0'}} >
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.playSong(1)}>
                            <Normal numberOfLines={1} style={{fontSize: 14}} color={'black'}>{item.title}</Normal>
                            <Tip title={item.subTitle}  color={'black'} numberOfLines={1} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: 60, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Icon name={'oneIcon|menu_h_o'} size={20} />
                    </View>
                </View>
            </View>
        )
    };
    sectionHeader = () => (
        <View style={{height: 50, width: width, flexDirection: 'row', paddingLeft: 10, alignItems: 'center', backgroundColor: '#ffffff'}}>
            <View style={{width: 25, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity ><Icon name={'oneIcon|music_playing_s'} size={20} /></TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row',alignItems: 'center', height: '100%', marginLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderColor: '#F0F0F0'}} >
                <Text>播放全部</Text>
                <Normal title={`（共${mockData.songs.length}首）`} />
                <View style={{flex: 1}} />
                <Icon name={'oneIcon|menu_h_o'} size={20} />
            </View>
        </View>
    );
    scrollToIndex = (params) => {   // flatlist滚到顶部
        alert(JSON.stringify(params))
    };



    //{mockData.songs[0].no}
    render() {
        var search=this.props.navigation.state.params.search;
        return (
            mockData!=null ?<View style={{flex: 1}}>
                    <View style={{backgroundColor: '#777777', height: 60, width: width}}>
                        <View style={{height: 50, width:width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
                            <Image source={{uri: mockData.songs[0].al.picUrl}} style={[styles.bg, {zIndex: -1, alignSelf: 'baseline', height: width * 0.6 + 50}]} blurRadius={4} />
                            {/*<View style={{width: screen.width, height: screen.width * 0.7, position: 'absolute', top: 50, zIndex: 2, backgroundColor: '#ffffff', opacity: 0.3,}} />*/}
                            <TouchableOpacity
                                onPress={() => this.backPrevious()}
                                style={{width: width * 0.25, paddingLeft: 10,marginTop: 25}}
                            >
                                <Icon name={'oneIcon|nav_back_o'}  size={25} color={commonStyle.white} />
                            </TouchableOpacity>
                        
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: width * 0.25, paddingRight: 10,marginTop: 25}}>
                               
                                <Icon name={'oneIcon|share_o'} size={20} color={commonStyle.white}/>
                            </View>
                        </View>
                    </View>
                    <SectionList
                        style={{backgroundColor: '#fff'}}
                        refreshing={this.state.refreshing}
                        keyExtractor={(item, index) => index}
                        sections={[{key: '1', data: this.state.dataList}]}
                        renderItem={this.renderItem}
                        renderSectionHeader={this.sectionHeader}
                        ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
                        stickySectionHeadersEnabled
                        scrollToLocation={this.scrollToLocation}
                    />

                </View>:<View style={styles.othercontainer}><ActivityIndicator text="正在加载" /></View>
        );
    }
}

export default connect(state => ({
	state: state.user
}), (dispatch) => ({
	actions: bindActionCreators(action.user, dispatch)
}))(SearchMusic);

const styles = StyleSheet.create({
    bgContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: height,
        width: width,
    },
    navBarStyle: {
        position: 'absolute',
        // backgroundColor: 'rgba(0, 0, 0, 0)',
        width: width,
        height: height/11,
        // borderBottomWidth:1,
        borderBottomColor:'black',
    },
    navBarContent:{
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginHorizontal: 10
    },
    othercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: commonStyle.black,
        fontSize: 14
    },
    subTitle: {
        color: commonStyle.black,
        fontSize: 11,
        marginTop: 5
    },
    header: {
        height: width * 0.6,
        width: width,
        backgroundColor: '#777777',
    },
    bg: {
        position: 'absolute',
        top: 0,
        opacity: 0.3,
        height: width * 0.6,
        width:width,
    },
});