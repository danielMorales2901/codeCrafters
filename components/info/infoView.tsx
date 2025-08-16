import { Linking, Image, StyleSheet, Text, View, Pressable } from "react-native";

export function InfoView() {
  const openExternalLink = () => {
    Linking.openURL("https://infogram.com/safetouch-overview-1hnq41oxm5y3p23?live");
  };

  return (
    <View style={styles.content}>
      <Text style={styles.text}>¿Quieres conocer más sobre nuestro trabajo?</Text>
      <Pressable onPress={openExternalLink}>
        <Image
          style={styles.image}
          source={require("../../assets/images/qr.jpg")}
        />
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    gap: 30
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "monospace",
    color: "white",
    width: "90%"
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
  },
})