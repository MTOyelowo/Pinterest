import { Entypo, Feather } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import pins from "../assets/data/pins";

import EditScreenInfo from "../components/EditScreenInfo";
import MasonryList from "../components/MasonryList";
import { Text, View } from "../components/Themed";
import { useNhostClient, useSignOut, useUserId } from "@nhost/react";
import { useEffect, useState } from "react";

const GET_USER_QUERY = `
query MyQuery($id: uuid!) {
  user(id: $id) {
    id
    avatarUrl
    displayName
    pins {
      id
      image
      title
      created_at
    }
  }
}
`;

export default function ProfileScreen() {
  const [user, setUser] = useState();

  const nhost = useNhostClient();
  const { signOut } = useSignOut();

  const userId = useUserId();

  const fetchUserData = async () => {
    const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
    console.log(result);
    if (result.error) {
      Alert.alert("Error fetching the user");
    } else {
    }
    setUser(result.data.user);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icons}>
          <View style={{ flexDirection: "row" }}>
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Feather name="share" size={24} color="black" style={styles.icon} />
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Pressable onPress={signOut}>
              <Text
                style={{
                  color: "#2093FF",
                  fontSize: 17,
                  fontWeight: "600",
                }}
              >
                Sign Out
              </Text>
            </Pressable>
          </View>
        </View>
        <Image
          style={styles.image}
          source={{
            uri: user.avatarUrl,
          }}
        />
        <Text style={styles.title}>{user.displayName}</Text>
        <Text style={styles.subtitle}>123 Followers | 535 Folowings</Text>
      </View>
      <MasonryList pins={user.pins} onRefresh={fetchUserData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  icons: {
    width: "100%",
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  },
  icon: {
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  subtitle: {
    color: "#181818",
    fontSize: 14,
  },
});
