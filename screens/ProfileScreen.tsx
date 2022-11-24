import { Entypo, Feather } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import pins from "../assets/data/pins";

import EditScreenInfo from "../components/EditScreenInfo";
import MasonryList from "../components/MasonryList";
import { Text, View } from "../components/Themed";
import { useSignOut } from "@nhost/react";

export default function ProfileScreen() {
  const { signOut } = useSignOut();

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
            uri: "https://scontent.fabv2-1.fna.fbcdn.net/v/t1.18169-9/13690860_645727042245717_4777793521603083600_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeHWNe7-a4zfhdPJ82lqQY4kXkYq9AkJRr5eRir0CQlGvt1ehonVazvtxtfKBojZwm8DW6vmzpEgq5BeUG1vcihG&_nc_ohc=IXpGRc9Hb1UAX9ZXr-w&_nc_ht=scontent.fabv2-1.fna&oh=00_AfD34TbrMmBTJtVqh5gGJroASHjALphPatBU9hhay8_vyA&oe=63A2B681",
          }}
        />
        <Text style={styles.title}>M.T. Oyelowo</Text>
        <Text style={styles.subtitle}>123 Followers | 535 Folowings</Text>
      </View>
      <MasonryList pins={pins} />
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
