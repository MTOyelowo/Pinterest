import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNhostClient } from "@nhost/react";

const RemoteImage = ({ fileId }) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [imageUri, setImageUri] = useState("");

  const nhost = useNhostClient();

  const fetchImage = async () => {
    const result = await nhost.storage.getPresignedUrl({ fileId });
    if (result.presignedUrl?.url) {
      setImageUri(result.presignedUrl.url);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [fileId]);

  useEffect(() => {
    if (imageUri) {
      Image.getSize(imageUri, (width, height) =>
        setAspectRatio(width / height)
      );
    }
  }, [imageUri]);

  if (!imageUri) {
    return <ActivityIndicator />;
  }

  return (
    <Image
      style={[styles.image, { aspectRatio: aspectRatio }]}
      source={{
        uri: imageUri,
      }}
    />
  );
};

export default RemoteImage;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 15,
  },
});
