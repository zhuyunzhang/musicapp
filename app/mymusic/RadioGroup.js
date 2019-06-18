import React, {Component} from "react";
import {Button, StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";


export default class RadioGroup extends Component {


    constructor(props) {
        super(props)

        this.state = {
            selectIndex: this.props.selectIndex ? this.props.selectIndex : '',
            data: this.props.data ? this.props.data : [{value: '有',}, {value: '没有'}],
        };
    }


    render() {
        let newArray = this.state.data;
        return (
            <View style={[this.props.style]}>
                {
                    newArray.map((item, index) =>

                        this.renderRadioButton(newArray, item, this.onPress, index, this.state.selectIndex)
                    )
                }
            </View>
        )
    }


    onPress = (index, item)=> {
        let array = this.state.data;
        for (let i = 0; i < array.length; i++) {
            let item = array[i];
            item.select = false;
            if (i == index) {
                item.select = true;
            }
        }
        this.setState({selectIndex: index});
        this.props.onPress ? this.props.onPress(index, item) : ()=> {
        }
    }

    renderRadioButton(array, item, onPress, index, sexIndex) {

        let backgroundColor = 'red';
        let image = item.image
        if (item.select == true) {
            image = item.image2;
            backgroundColor = 'blue';
        } else {
            image = item.image;
            backgroundColor = 'red';
        }

        if (sexIndex == index && sexIndex != '') {
            backgroundColor = 'blue';
            image = item.image2;
        }
        // let childViewWidth = item.childViewWidth ? item.childViewWidth : 100;
        // let childViewHeight = item.childViewHeight ? item.childViewHeight : 44;
        // let childViewbackgroundColor = item.childViewbackgroundColor ? item.childViewbackgroundColor : 'white';
        //
        //
        // let imageWidth = item.imageWidth ? item.imageWidth : 20;
        // let imageHeigt = item.imageHeigt ? item.imageHeigt : 20;


        return (
            <TouchableOpacity key={index} onPress={()=> {
                onPress(index, item)
            }} style={[{
                width: 100,
                height: 43,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },this.props.conTainStyle]}>
                <Image style={[{width: 20, height: 20},this.props.imageStyle]} source={image}/>
                <Text style={[{marginLeft: 15},this.props.textStyle]}>{item.value}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: 'white',
    }
});
