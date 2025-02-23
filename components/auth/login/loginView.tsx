import { router, useRouter } from "expo-router";
import { AppState, Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import React, { useState } from 'react'
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function LoginView() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [usuario, setUsuario] = useState<User | null>(null);

  // Create a new user document with some data
  const newUser = {
    email: email,
  };
  // Get a reference to a collection (replace 'yourCollection' with your collection name)
  const usersRef = collection(db, 'users');

  async function signInWithEmail() {
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;

      if (!user) {
        Alert.alert("Error", "No se pudo autenticar el usuario.");
        return;
      }

      // Verificar si el usuario ya está en Firestore
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Si no existe en Firestore, lo agregamos
        await addDoc(usersRef, { email: email, uid: user.uid, displayName: user.displayName || "" });
        console.log("Usuario agregado a la colección 'users'");

      } else {
        console.log("El usuario ya existe en la colección 'users'");
      }
      Alert.alert("Datos correctos, bienvenido")
      router.replace("/(home)")

    } catch (error) {
      console.log(`Error ${error}`);
      Alert.alert("Error", "Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }

  }








  return (
    <ImageBackground style={styles.content} resizeMode="cover" source={require("../../../assets/images/fondoIniSes.jpeg")}>
      <View style={styles.cajaIni}>
        <Image source={require("../../../assets/images/logo.png")} style={styles.imgLogo} resizeMode="cover" />
        <View style={styles.spaceContent}>
          <View style={styles.apartado}>
            <Text style={styles.label}>Correo:</Text>
            <TextInput
              //label="Email"
              //leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.apartado}>
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              //label="Password"
              //leftIcon={{ type: 'font-awesome', name: 'lock' }}
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          </View>
        </View>
        <View style={styles.apartado}>
          <TouchableOpacity style={styles.botonIniSes} disabled={loading} onPress={() => signInWithEmail()}>
            <Text style={styles.botonText} >Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",

  },
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
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
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 16,
    padding: 4,
    paddingLeft: 7,
    width: "100%",
    height: 45,
    color: "black",
    backgroundColor: "rgba(216, 223, 255, 0.64)"
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
    flexDirection: "column"
  },
  label: {
    fontSize: 18,
    fontFamily: "monospace",
    color: "white"
  },
  botonIniSes: {
    width: 200,
    height: 50,
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

