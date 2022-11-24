import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNhostClient } from "@nhost/react";
import RemoteImage from "../components/RemoteImage";

const GET_PIN_QUERY = `
query MyQuery ($id: uuid!) {
  pins_by_pk(id: $id) {
    created_at
    id
    image
    title
    user_id
    user {
      avatarUrl
      displayName
      id
    }
  }
}
`;

const PinScreen = () => {
  const [pin, setPin] = useState<any>(null);

  const nhost = useNhostClient();

  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useNavigation();

  const pinId = route.params?.id;

  const fetchPin = async (pinId) => {
    const response = await nhost.graphql.request(GET_PIN_QUERY, { id: pinId });
    if (response.error) {
      Alert.alert("Error fetching the pin");
    } else {
      setPin(response.data.pins_by_pk);
    }
  };

  useEffect(() => {
    fetchPin(pinId);
  }, [pinId]);

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
        <RemoteImage fileId={pin.image} />
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
    backgroundColor: "gainsboro",
    borderRadius: 9999,
    padding: 5,
  },
});
