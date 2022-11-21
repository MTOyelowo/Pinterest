import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  View,
  Platform,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function CreatePinScreen() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {};

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
      }}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <View style={styles.root}>
        <Pressable onPress={pickImage}>
          <Text
            style={{
              color: "#2093FF",
              fontSize: 17,
              fontWeight: "600",
              padding: 10,
            }}
          >
            Add an Image to your Pins
          </Text>
        </Pressable>
        {image && (
          <>
            <Image source={{ uri: image }} style={styles.image} />
            <TextInput
              placeholder="Pin Title..."
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <Pressable onPress={onSubmit}>
              <Text
                style={{
                  color: "#2093FF",
                  fontSize: 17,
                  fontWeight: "600",
                  padding: 10,
                }}
              >
                Upload Pin
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  view: {
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 5,
    width: "100%",
    borderRadius: 5,
    marginBottom: 5,
  },
});
