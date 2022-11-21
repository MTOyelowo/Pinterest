import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import pins from "../assets/data/pins";

const PinScreen = () => {
  const [ratio, setRatio] = useState(1);

  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useNavigation();

  const pinId = route.params?.id;

  const pin = pins.find((p) => p.id === pinId);

  useEffect(() => {
    if (pin?.image) {
      Image.getSize(pin.image, (width, height) => setRatio(width / height));
    }
  }, [pin]);

  const goBack = () => {
    navigation.goBack();
  };

  if (!pin) {
    return <Text>Pin Not Found</Text>;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <Image
          source={{ uri: pin.image }}
          style={[styles.image, { aspectRatio: ratio }]}
        />
        <Text style={styles.title}>{pin.title}</Text>
      </View>
      <Pressable
        style={[styles.backButton, { top: insets.top + 15 }]}
        onPress={goBack}
      >
        <Ionicons name="chevron-back" size={30} color="black" />
      </Pressable>
    </SafeAreaView>
  );
};

export default PinScreen;

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    margin: 10,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 35,
  },
  backButton: {
    position: "absolute",
    left: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 9999,
    padding: 5,
  },
});
