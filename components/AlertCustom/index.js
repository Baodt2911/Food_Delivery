import { View, Text, Modal, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
const AlertCustom = ({ title, message, onClose, visible, callbackOrButton }) => {
  const { width: widthScreen, height: heightScreen } = Dimensions.get('window')
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={() => { onClose() }}
    >
      <View className='flex-1 justify-center items-center bg-[#3b3b3b4d]'>
        <View
          style={{
            width: widthScreen * 0.7,
            paddingBottom: 10,
            borderRadius: 10,
            backgroundColor: '#fff',
            shadowColor: '#f5f5f5',
            shadowOpacity: 0.3,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 0 },
            elevation: 5
          }}>
          {/* Headers title */}
          <View className='border-b border-[#f3f3f3]'>
            <Text className='font-[BentonSans-Bold]  text-center py-2 text-base'>{title || 'Alert custom'}</Text>
          </View>
          {/* Sub-Title */}
          <View className='px-3 pt-2 pb-5'>
            <Text className='font-[BentonSans-Medium] text-[#3B3B3B] leading-5'>{message}</Text>
          </View>
          {/* Button */}
          {
            !callbackOrButton ?
              <View className='flex-row   px-4' style={{ justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={onClose} className='bg-bgrButton px-5 py-2 rounded-lg'>
                  <Text className='font-[BentonSans-Medium]  text-white'>OK</Text>
                </TouchableOpacity>
              </View> :
              callbackOrButton.length === 1 ?
                <View className='flex-row   px-4' style={{ justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={() => {
                    callbackOrButton[0].onPress()
                    onClose()
                  }} className='bg-bgrButton px-5 py-2 rounded-lg'>
                    <Text className='font-[BentonSans-Medium]  text-white'>{callbackOrButton[0].text}</Text>
                  </TouchableOpacity>
                </View> :
                <View className='flex-row  px-4' style={{ justifyContent: 'space-evenly' }}>
                  {
                    callbackOrButton.map(item =>
                      <View key={item.text} >
                        <TouchableOpacity onPress={() => {
                          item.onPress()
                          onClose()
                        }} className='bg-bgrButton px-5 py-2 rounded-lg'>
                          <Text className='font-[BentonSans-Medium]  text-white'>{item.text}</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }
                </View>
          }
        </View>
      </View>
    </Modal>
  )
}

export default AlertCustom