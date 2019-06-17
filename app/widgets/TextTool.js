
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import color  from './color';

export const Normal = ({title, style, numberOfLines, color, children}) => <Text style={[styles.normal, style, {color: color || '#000000'}]} numberOfLines={numberOfLines || 0}>{title || children}</Text>;


export const Tip = ({title, style, numberOfLines, children, color}) => <Text style={[styles.tip, style, {color: color || '#000000'}]} numberOfLines={numberOfLines || 0}>{title || children}</Text>;

export const H3 = ({title, style, numberOfLines, color, children}) => <Text style={[styles.H3, style, {color: color || '#000000'}]} numberOfLines={numberOfLines || 0}>{title || children}</Text>;
const styles = StyleSheet.create({

    normal: {
        fontSize: 12,
        color: '#000000',
    },
    tip: {
        fontSize: 11,
    },
    H3: {
        fontSize: 16,
        fontWeight: '300',
        color: color.black,
    },
});

