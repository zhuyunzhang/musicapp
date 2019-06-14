
import React, { PureComponent } from 'react';
import { View, StyleSheet, Text,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {height, width} =  Dimensions.get('window');
class IconMenu extends PureComponent {
    render() {
        const { title, icon } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Icon name={icon} size={25} color="#D43C33" />
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 4,
        height: width / 4,
    },
    iconContainer: {
        height: '50%',
        width: '50%',
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        borderColor: '#CD3700',
        alignItems: 'center'
    },
    text: {
        marginTop: 5,
        fontSize: 11,
    }
});

export default IconMenu;