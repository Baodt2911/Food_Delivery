import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NOTIFICATION_ICON from "../../assets/icons/notification.svg";
import SEARCH_ICON from "../../assets/icons/search.svg";
import FILTER_ICON from "../../assets/icons/filter.svg";
import CLOSE_ICON from "../../assets/icons/xmark.svg";
import { API_URL } from "@env";

const Search = ({ handleShowSuggestSearch }) => {
  const widthDimension = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [textSearch, setTextSearch] = useState("");
  const [dataSuggest, setDataSuggest] = useState(null);
  const [isMore, setIsMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("dishes");
  const searchRef = useRef();
  useEffect(() => {
    if (!textSearch) {
      handleShowSuggestSearch(false);
    }
    const fetchData = async () => {
      const existingSuggest = await fetch(
        API_URL + `${type}/search?order=suggest&q=${textSearch}`
      ).then((res) => res.json());
      setDataSuggest(existingSuggest);
    };
    if (textSearch) {
      fetchData();
    }
  }, [textSearch]);
  const handleSearch = () => {
    const options = {
      title: `Results for: ${textSearch}`,
      url: `${type}/search?q=${textSearch}`,
      style: {
        width: widthDimension > 375 ? "100%" : 325,
        height: 80,
      },
      contentContainerStyle: {
        rowGap: 20,
      },
    };
    if (textSearch) {
      navigation.navigate("ViewMore", options);
      setTextSearch("");
      handleShowSuggestSearch(false);
    }
  };
  return (
    <View className="flex-1">
      {/* Title */}
      <View className="mt-[50] flex-row items-center justify-between pl-[30] pr-[40] ">
        <View style={{ width: widthDimension <= 360 ? "60%" : "70%" }}>
          <Text className="font-[BentonSans-Bold] text-3xl">
            Find Your Favorite Food
          </Text>
        </View>
        {/* btn notification */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Notification");
          }}
          className="relative bg-[#ffffff] w-[45] h-[45] items-center justify-center rounded-2xl"
          style={{
            borderWidth: 1,
            borderColor: Platform.OS === "ios" ? "#f4f4f4" : "transparent",
            shadowColor: "#24C87C",
            elevation: 10,
          }}
        >
          <NOTIFICATION_ICON width={30} height={30} stroke={"#24C87C"} />
          {/* Active */}
          <View className="absolute bg-red-500 w-[10] h-[10] rounded-full top-2 right-[12]  border-white border-2"></View>
        </TouchableOpacity>
      </View>
      {/* Search */}
      <View className="flex-row items-center mx-6 mt-5">
        <View className="bg-bgrSearch flex-row items-center h-[50] rounded-xl pl-3 flex-grow">
          <SEARCH_ICON />
          <TextInput
            className="pl-3 font-[Roboto-Regular] h-full"
            style={{
              maxWidth: widthDimension * 0.5,
            }}
            placeholder="What do you want to order?"
            onChangeText={(text) => {
              setTextSearch(text);
              handleShowSuggestSearch(true);
            }}
            value={textSearch}
            returnKeyType="search"
            onSubmitEditing={() => handleSearch()}
            ref={searchRef}
          />
          {/* Clear text */}
          {textSearch ? (
            <TouchableOpacity
              onPress={() => {
                setTextSearch("");
                setIsMore(false);
                handleShowSuggestSearch(false);
              }}
              className="absolute right-3"
            >
              <CLOSE_ICON width={20} height={20} fill={"#FEAD1D"} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        {/* Filter btn */}
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          className="bg-bgrSearch w-[50] h-[50] ml-3 rounded-xl items-center justify-center"
        >
          <FILTER_ICON />
        </TouchableOpacity>
        {/* Card select filter */}
        <Modal
          transparent={true}
          visible={isVisible}
          onRequestClose={() => setIsVisible(!isVisible)}
        >
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            className="flex-1 justify-center items-center bg-[#3b3b3b4d]"
          >
            <View
              style={{
                width: widthDimension * 0.5,
                height: 100,
                borderRadius: 10,
                backgroundColor: "#FEAD1D",
                shadowColor: "#f5f5f5",
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 0 },
                elevation: 5,
              }}
            >
              <View className="justify-center items-center  py-2">
                <Text className="font-[BentonSans-Bold] text-white">
                  Select type search
                </Text>
              </View>
              <View
                className="bg-[#f5f5f5cc] flex-1"
                style={{
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setType("dishes");
                    setIsVisible(false);
                  }}
                  className="flex-1 pl-7 justify-center border-b border-[#f5f5f5cc]"
                >
                  <Text
                    className="font-[BentonSans-Medium] "
                    style={{ color: type === "dishes" ? "red" : "#3b3b3b" }}
                  >
                    Menu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setType("restaurants");
                    setIsVisible(false);
                  }}
                  className="flex-1 pl-7 justify-center "
                >
                  <Text
                    className="font-[BentonSans-Medium]"
                    style={{
                      color: type === "restaurants" ? "red" : "#3b3b3b",
                    }}
                  >
                    Restaurant
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      {
        /* Suggest */
        !textSearch ? (
          <></>
        ) : (
          <View className=" w-full h-full bg-[#f5f5f54D]  pt-3">
            <View style={{ height: isMore ? "60%" : 250 }}>
              <ScrollView style={{ flex: 1 }} scrollEnabled={isMore}>
                {!dataSuggest ? (
                  textSearch ? (
                    <ActivityIndicator color={"#24C87C"} />
                  ) : (
                    <></>
                  )
                ) : (
                  dataSuggest.data.map((item) => (
                    <TouchableOpacity
                      onPress={() => {
                        setTextSearch(item.name);
                        searchRef.current.focus();
                      }}
                      key={item._id}
                      className="px-10 py-5 border-b border-[#ededed]"
                    >
                      <Text className="font-[BentonSans-Bold] text-[#FEAD1Dcc]">
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
            {/* More */}
            {dataSuggest?.data.length > 5 ? (
              <TouchableOpacity
                onPress={() => setIsMore(true)}
                className="mx-auto mt-5"
                style={{ display: isMore ? "none" : "flex" }}
              >
                <Text className="underline text-[#24C87C] font-[BentonSans-Medium] text-base">
                  Xem thêm
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        )
      }
    </View>
  );
};

export default Search;
