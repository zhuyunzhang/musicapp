/**
 * Copyright 2017-present, chenghao.
 * All rights reserved.
 *
 * 添加注释
 * Created by SEELE on 2017/10/23
 *
 */
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Tip } from './TextTool';

export default ({icon, color = '#000000', title}) => (
    <View style={{alignItems: 'center'}}>
        <Icon name={icon} size={25} color={color} />
        <Tip color={color}>{title}</Tip>
    </View>
)