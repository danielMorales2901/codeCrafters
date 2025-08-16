import { Link, router, useRouter } from "expo-router";
import { AppState, Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, Pressable } from "react-native";
import React, { useState } from 'react'
import { auth, firebase_db } from "@/lib/firebase";
import { signInWithEmailAndPassword, User, signOut } from "firebase/auth"; // Importa signOut
import { collection, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { userType } from "@/components/users/user";

export function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user) {
        Alert.alert("Error", "No se pudo autenticar el usuario.");
        return;
      }

      const q = query(collection(firebase_db, "users"), where("correo", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Error", "Usuario no encontrado en Firestore.");
        return;
      }

      const userData = querySnapshot.docs[0].data();

      // Función para cerrar la sesión del usuario
      const signTheOutUser = async () => {
        try {
          await signOut(auth);
          Alert.alert("Acceso denegado", "Tu sesión ha sido cerrada.");
        } catch (error: any) {
          console.error("Error al cerrar la sesión:", error);
          Alert.alert("Error", "No se pudo cerrar la sesión. Contacta al soporte.");
        }
      };

      if (!userData.casilleroHuellas || userData.admin == true) {
        Alert.alert("Acceso denegado", "Tu cuenta no tiene un casillero asignado o eres un administrador");
        signTheOutUser();
        return;
      }

      if (userData.casilleroHuellas != 1 && userData.casilleroHuellas != 2) {
        Alert.alert("El casillero no existe");
        signTheOutUser();
        return;
      } else {
        console.log("HOLAA");

        console.log(userData.casilleroHuellas);
        //Alert.alert("Datos correctos", "Bienvenido a tu casillero movil");
        setEmail("");
        setPassword("");
        router.replace("/(home)/homeScreen");
      }

    } catch (error: any) {
      console.log(`Error ${error}`);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        Alert.alert("Error", "Correo o contraseña incorrectos");
      } else {
        Alert.alert(`Error, Ocurrió un error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    // <ImageBackground style={styles.content} resizeMode="cover" source={require("../../../assets/images/fondoIniSes.jpeg")}>
    <View style={styles.content}>
      <View style={styles.cajaIni}>
        <Image source={require("../../../assets/images/logo.png")} style={styles.imgLogo} resizeMode="cover" />
        <View style={styles.spaceContent}>
          <View style={styles.apartado}>
            <Text style={styles.label}>Correo:</Text>
            <TextInput
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
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
            <Link href="/changePass/change" asChild>
              <Pressable >
                <Text style={styles.recuperar}>¿Olvidaste tu contraseña?</Text>
              </Pressable>
            </Link>
          </View>
        </View>
        <View style={styles.apartado}>
          <TouchableOpacity style={styles.botonIniSes} disabled={loading} onPress={() => signInWithEmail()}>
            <Text style={styles.botonText} >Iniciar sesión</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
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
    height: "auto",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    backgroundColor: "#1e1e1e",
    borderRadius:16,
    borderColor:"white",
    borderWidth:.2
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
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
  recuperar: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "monospace",
    color: "gray",
    marginTop: 8,
    textDecorationLine:"underline"
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
  text: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "monospace",
  }
});
