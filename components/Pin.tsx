import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useNhostClient } from "@nhost/react";
import RemoteImage from "./RemoteImage";

const Pin = (props) => {
  const { id, title, image } = props.pin;

  const navigation = useNavigation();

  const onLike = () => {};

  const goToPinPage = () => {
    navigation.navigate("Pin", { id });
  };

  return (
    <Pressable onPress={goToPinPage} style={styles.pin}>
      <View>
        <RemoteImage fileId={image} />
        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={16} color="black" />
        </Pressable>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    padding: 4,
  },
  heartBtn: {
    backgroundColor: "#D2CFD4",
    position: "absolute",
    bottom: 12.5,
    right: 12.5,
    borderRadius: 50,
    padding: 7.5,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "semibold",
    margin: 5,
    color: "#181818",
  },
});

export default Pin;
