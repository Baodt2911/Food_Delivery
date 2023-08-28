import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import BottomSheet from "../components/BottomSheet";
import ICON_LOCATION from "../assets/icons/icon-location.svg";
import ICON_HEART from "../assets/icons/heart.png";
import Evaluate from "../components/Evaluate";
import CardDetail from "../components/CardDetail";
import { URL_IMAGE, API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthProvider";
import AlertCustom from "../components/AlertCustom";
import socket from "../utils/socket";

const Detail = ({ route }) => {
  const { id, type, photoURL } = route.params;
  const {
    userInfor: { _id: userId },
    refreshToken,
    checkTokenExpiration,
  } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleAddCart = async () => {
    try {
      let accessToken = await AsyncStorage.getItem("accessToken");
      if (!checkTokenExpiration(accessToken)) {
        accessToken = await refreshToken();
      }
      socket.emit("add-to-cart", {
        userId,
        accessToken,
        cart: {
          product: id,
        },
      });
      handleShowAlert();
    } catch (error) {
      console.log("Add to cart", error);
    }
  };
  const handleShowAlert = () => {
    setIsModalVisible(true);
  };
  const handleCloseAlert = () => {
    setIsModalVisible(false);
  };
  return (
    <View className="flex-1">
      <Image
        style={{ width: "100%", height: "60%" }}
        source={{ uri: URL_IMAGE + photoURL + "?alt=media" }}
      />
      {/* Alert */}
      <AlertCustom
        title={"Notification"}
        message={"Added to cart"}
        visible={isModalVisible}
        onClose={handleCloseAlert}
      />
      <BottomSheet>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Title */}
          <View className="flex-row justify-between items-center mx-[30] mt-5">
            <View className="w-[80] h-[34] rounded-2xl bg-[#EDFDF2] justify-center items-center">
              <Text className="font-[BentonSans-Medium]  text-bgrButton text-xs">
                Popular
              </Text>
            </View>
            <View className="flex-row gap-x-5">
              {/* Location button */}
              <TouchableOpacity>
                <ICON_LOCATION />
              </TouchableOpacity>
              {/* Favorite button */}
              <TouchableOpacity className="rounded-full w-[34] h-[34] bg-[#FEE8E9] justify-center items-center">
                <Image
                  source={ICON_HEART}
                  resizeMode="contain"
                  className="w-4 h-4"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* CardDetail */}
          <CardDetail id={id} type={type} />
          {/*List Evaluate */}
          <Evaluate id={id} type={type} />
        </ScrollView>
      </BottomSheet>
      {/* Add to Chart */}
      {type === "restaurants" ? (
        <></>
      ) : (
        <View className="absolute  bottom-6 w-full px-[30]">
          <TouchableOpacity
            onPress={() => handleAddCart()}
            className=" w-full h-[60] bg-bgrButton rounded-2xl justify-center items-center"
          >
            <Text className="text-white font-[BentonSans-Bold] text-base">
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Detail;
