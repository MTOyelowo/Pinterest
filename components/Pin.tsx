import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import pins from "../assets/data/pins";

const Pin = (props) => {
  const { title, image } = props.pin;

  const [aspectRatio, setAspectRatio] = useState(1);

  const onLike = () => {};

  useEffect(() => {
    if (image) {
      Image.getSize(image, (width, height) => setAspectRatio(width / height));
    }
  }, [image]);

  return (
    <View style={styles.pin}>
      <View>
        <Image
          style={[styles.image, { aspectRatio: aspectRatio }]}
          source={{
            uri: image,
          }}
        />
        <Pressable onPress={onLike} style={styles.heartBtn}>
          <AntDesign name="hearto" size={16} color="black" />
        </Pressable>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    padding: 4,
  },
  image: {
    width: "100%",
    borderRadius: 15,
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
