import React, { useRef } from 'react'
import { View, Text, Animated, PanResponder, Dimensions, Platform } from 'react-native'
const BOTTOM_SHEET_MAX_HEIGHT = Dimensions.get('window').height * 0.9
const BOTTOM_SHEET_MIN_HEIGHT = Dimensions.get('window').height * 0.5
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT //negative number
const MAX_DOWNWARD_TRANSLATE_Y = 0
const DRAG_THRESHOLD = 150
const BottomSheet = ({ children }) => {
    const animatedValue = useRef(new Animated.Value(0)).current
    const lastGestureDy = useRef(0)
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                animatedValue.setOffset(lastGestureDy.current)
            },
            onPanResponderMove: (e, gesture) => {
                animatedValue.setValue(gesture.dy)
            },
            onPanResponderRelease: (e, gesture) => {
                lastGestureDy.current += gesture.dy
                animatedValue.flattenOffset()
                // if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
                //     lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y
                // } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
                //     lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y
                // }

                if (gesture.dy > 0) {
                    //dragging down
                    spingAnimation('down')
                } else {
                    //dragging up
                    if (gesture.dy >= -DRAG_THRESHOLD) {
                        spingAnimation('down')
                    } else {
                        spingAnimation('up')
                    }
                }
            }
        })
    ).current
    const spingAnimation = (direction) => {
        lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y
        Animated.spring(animatedValue, {
            toValue: lastGestureDy.current,
            useNativeDriver: true
        }).start()
    }
    return (
        <Animated.View style={{
            position: 'absolute',
            width: '100%',
            height: BOTTOM_SHEET_MAX_HEIGHT,
            bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
            backgroundColor: '#fff',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            ...Platform.select({
                android: { elevation: 3 },
                ios: {
                    shadowColor: '#a8bed2',
                    shadowOpacity: 1,
                    shadowRadius: 6,
                    shadowOffset: {
                        width: 2,
                        height: 2
                    }
                }
            }),
            transform: [{
                translateY: animatedValue.interpolate({
                    inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    extrapolate: 'clamp'
                })
            }]
        }}>
            {/* Draggable Area */}
            <View
                style={{
                    width: 150,
                    height: 40,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                {...panResponder.panHandlers}>
                {/* DragHandle */}
                <View style={{
                    width: 100,
                    height: 6,
                    backgroundColor: '#FEF6ED',
                    borderRadius: 5
                }} />
            </View>
            {/* Content */}
            {children}
        </Animated.View>
    )
}

export default BottomSheet