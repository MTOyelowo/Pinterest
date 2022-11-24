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
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNhostClient } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";

const CREATE_PIN_MUTATION = `
mutation MyMutation ($image: String!, $title: String ) {
  insert_pins(objects: {image: $image, title: $title}) {
    returning {
      created_at
      id
      image
      title
      user_id
    }
  }
}`;

export default function CreatePinScreen() {
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [title, setTitle] = useState("");

  const nhost = useNhostClient();
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadFile = async () => {
    if (!imageUri) {
      return {
        error: {
          message: "No image selected",
        },
      };
    }

    const parts = imageUri.split("/");
    const name = parts[parts.length - 1];
    const nameParts = name.split(".");
    const extension = nameParts[nameParts.length - 1];

    const uri =
      Platform.OS === "ios" ? imageUri?.replace("file://", "") : imageUri;
    const result = await nhost.storage.upload({
      file: {
        name,
        type: `image/${extension}`,
        uri,
      },
    });
    return result;
  };

  const onSubmit = async () => {
    // upload image to storage
    const uploadResult = await uploadFile();

    if (uploadResult.error) {
      Alert.alert("Error uploading the image", uploadResult.error.message);
      return;
    }

    const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
      title,
      image: uploadResult.fileMetadata.id,
    });

    if (result.error) {
      Alert.alert("Error uploading the pin: ", result.error.message);
    } else {
      navigation.goBack();
    }
  };

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
        {imageUri && (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
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
