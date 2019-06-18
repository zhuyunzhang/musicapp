import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    SectionList
} from 'react-native';
import { Button,Icon,Progress,Checkbox,List,Radio} from '@ant-design/react-native';
import * as action from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import survey from'./survey.json';
import RadioForm from 'react-native-simple-radio-button';

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

const {height, width} =  Dimensions.get('window');
let self ;
var mockData=null;
var fruits = [];
var ranks=[];
var ides=[];
class UserSurvey extends Component {
	constructor(props) {
        super(props);
        self = this;
        this.state = {
        	survey:null,
        	value:0,
        	finish:0,
        };
    }
    componentDidMount() {

    }
   

    static navigationOptions = {
        title: '用户调研',
        headerLeft:(
            <View> 
                <TouchableOpacity onPress={() => self.onPressBack()}>
                    <Icon name="left" size={20} style={{color:'white',marginLeft:width / 16}}/>
                </TouchableOpacity>
            </View>
        ),
        headerStyle: {
            backgroundColor: '#4876FF',
            height :height/15
        },
        headerTitleStyle:{
        	color:'white'
        }
    };
    onPressBack(){
        const{navigation}=this.props;
        if(navigation){
        	fruits=[];
            navigation.goBack();
        }
     }
    scrollToLocation = (params) => {
        console.log("scrollToLocation======>>>"+params)
    };
    onPressRadioForm(value,id){
    	this.setState({value:value})
    	var count=fruits.indexOf(id);
    	if(count==-1){
    		fruits.push(id)
    	}
    	
    }
    onPressCheckboxItem(rank,ids){
    	let ideas = ides.indexOf(ids)
    	if(ideas >= 0){
			ides.splice(ides, 1)
    	}else{
    		 ides.push(ids)
    	}

     	console.log("=====>>>ids"+ides)
	    let index = ranks.indexOf(rank)
	    if (index >= 0) {
	      ranks.splice(index, 1)
	    } else {
	      ranks.push(rank)
	    }
	    console.log("=====>>>ranks"+ranks)
    }

    renderItem = ({item, index}) => {
    	const ids=item.id;
    	var DataItem = (items, i) => {
            return(
                <CheckboxItem  
                	
                    onChange={event => {
              		this.onPressCheckboxItem(i,ids)
            	}}>
            		{items.label}
            	</CheckboxItem>
            )
        }
        return (
            <View style={{marginTop:10}}>
            	<View style={{paddingLeft: 10}}>
            		<Text style={{fontWeight:'bold',fontSize:14}}>{index+1}丶{item.title}</Text>
            	</View>
            	<View style={{backgroundColor:'white'}}>
            		{
            			item.type ==1?(
            				<View style={{marginLeft:15,marginTop:15}}>
            					<RadioForm
            						radio_props={item.content}
            						buttonSize={10}
						          	initial={-1}
						          	onPress={(value) => {this.onPressRadioForm(value,ids)}}
            					/>
            				</View>
            			):(
            				<View>
            					<List style={{ marginTop: 12 }}>
            						{item.content.map(DataItem)}
						        </List>
            				</View>
            			)
            		}
            	</View>
            </View>
        )
    };
    render() {
    	console.log("======>>>"+fruits.length)

        return (
            <View  style={styles.container}>
                <View style={{marginTop:10,marginLeft:8}}>
                	<Text style={{fontSize:16,fontWeight:'bold'}} >{survey.result.title}</Text>
                	<Text style={{fontSize:14,marginTop:4}} >您好，非常感谢参与问卷调查，请根据您的真实情况进行回答，以便我们改进产品，提升您的使用体验</Text>
                </View>
                <View style={styles.pg}>
                	
		          	<View style={{ height: 20, flex: 1 }}>
		            	<Progress percent={fruits.length/survey.result.data.length*100} barStyle={{borderBottomWidth:20}}/>
		            	<Text style={{marginLeft:10}}>答题进度:{fruits.length}/{survey.result.data.length}</Text>
		          	</View>
		        </View>
		        <SectionList
                    style={{backgroundColor: '#F4F4F4'}}
                    refreshing={true}
                    keyExtractor={(item, index) => index}
                    sections={[{key: '1', data: survey.result.data}]}
                    renderItem={this.renderItem}
                    ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
                    stickySectionHeadersEnabled
                    scrollToLocation={this.scrollToLocation}
                />
	        </View>
        );
    }
}

export default connect(state => ({
	state: state.user
}), (dispatch) => ({
	actions: bindActionCreators(action.user, dispatch)
}))(UserSurvey);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  pg:{
  	  marginTop: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  }
};