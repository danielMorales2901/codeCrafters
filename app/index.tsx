import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [usu, setUsu] = useState("");
  const [pass, setPass] = useState("");

  const iniciarSesion = () => {
    if (usu.trim().toLowerCase() === "daniel morales" && pass.trim() === "Calamardo_01") {
      router.replace("/(employees)/explore");
      Alert.alert("Datos correctos!! Bienvenido");
    } else {
      Alert.alert("Datos incorrectos!! Verifica tus credenciales");
    }
  };

  return (
    <ImageBackground style={styles.content} source={require("../assets/images/fondoIniSes.jpeg")}>
      <View style={styles.cajaIni}>
        <Image source={require("../assets/images/logo.png")} style={styles.imgLogo} resizeMode="cover" />
        <View style={styles.spaceContent}>
          <View style={styles.apartado}>
            <Text style={styles.label}>Usuario:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu usuario"
              value={usu}
              onChangeText={setUsu}
            />
          </View>
          <View style={styles.apartado}>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu contraseña"
              value={pass}
              onChangeText={setPass}
              secureTextEntry={true} // Activado para evitar errores de espacios
            />
          </View>
        </View>
        <TouchableOpacity onPress={iniciarSesion} style={styles.botonIniSes}>
          <Text style={styles.botonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    objectFit: "cover",

  },
  cajaIni: {
    width: "70%",
    height: "60%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",

    gap: 50,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 16,
    padding: 4,
    paddingLeft: 7,
    width: "100%",
    height: 45,
  },
  imgLogo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  spaceContent: {
    gap: 20,
    width: "80%",
  },
  apartado: {
    gap: 7,
  },
  label: {
    fontSize: 18,
    fontFamily: "monospace"
  },
  botonIniSes: {
    width: "90%",
    height: "12%",
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  botonText: {
    fontSize: 16,
    fontFamily: "monospace"
  },
});
