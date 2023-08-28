import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Pattern from "../assets/images/Pattern1.png";
import BackIcon from "../assets/icons/back.svg";
import CardChatDeliver from "../components/CardChatDeliver";
const Chat = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="flex-1 bg-white"
        source={Pattern}
        resizeMode="cover"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-11 h-11 rounded-2xl bg-[#FFF6EF] items-center justify-center mt-10 ml-6"
          style={{
            shadowColor: "#333",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 1,
            elevation: 1,
          }}
        >
          <BackIcon />
        </TouchableOpacity>
        {/* Title */}
        <View className="pl-[25px] mr-[86px]  mt-5">
          <Text className="font-[BentonSans-Bold] text-2xl">Chat</Text>
        </View>
        {/* Content */}
        <View style={{ marginHorizontal: 20, rowGap: 20, marginTop: 20 }}>
          <CardChatDeliver />
          <CardChatDeliver />
          <CardChatDeliver />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Chat;
