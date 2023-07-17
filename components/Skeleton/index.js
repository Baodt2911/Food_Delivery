import React, { useEffect, useRef } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
const Skeleton = ({ width, height, style }) => {
    const loading = useRef(new Animated.Value(0.7)).current
    useEffect(() => {
        Animated.loop(
            Animated.timing(loading, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            })).start()
    }, [width, height])
    return (
        <View style={StyleSheet.flatten([{
            width: width,
            height: height,
            backgroundColor: "#fff"
        },
            style
        ])}>
            <Animated.View style={[
                { width: '100%', height: '100%', backgroundColor: "rgba(0,0,0,0.12)" },
                { opacity: loading },
                style
            ]} />
        </View>
    )
}

export default Skeleton