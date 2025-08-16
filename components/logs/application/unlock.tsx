import { Alert, StyleSheet, Text, TouchableOpacity, View, Image, Button } from "react-native";
import { auth, firebase_db } from '@/lib/firebase';
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export function Unlock() {
  const [isLoading, setIsLoading] = useState(false);
  const [userCasillero, setUserCasillero] = useState<number>(0); // Casillero asignado

  const API_URL_ON = `http://192.168.0.115/rele?numero=${userCasillero}&estado=on`; // Cambia por la IP de tu máquina con la API

  // Función para enviar comandos a la API
  const controlarRele = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL_ON, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('PILAS', "El casillero fue abierto");
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar a la API: ' + error);
    } finally {
      setIsLoading(false)
      agregarDatos(userCasillero)
    }
  };

  // Obtener el casillero asignado al usuario al cargar el componente
  useEffect(() => {
    const fetchUserCasillero = async () => {
      try {
        const userDocRef = doc(firebase_db, "users", auth.currentUser?.uid || "");
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserCasillero(data.casilleroHuellas); // Asume que el campo se llama "casillero"
        } else {
          Alert.alert("Error", "No se encontró información del usuario.");
        }
      } catch (error) {
        console.error("Error al obtener casillero:", error);
        Alert.alert("Error", "No se pudo cargar la información del usuario.");
      }
    };
    fetchUserCasillero();
  }, []);

  const date = new Date();

  async function agregarDatos(casillero: number) {
    try {
      const docRef = await addDoc(collection(firebase_db, "logs"), {
        casillero: casillero,
        fecha: date,
        nombre: auth.currentUser?.displayName || "Usuario desconocido",
        usuario_id: auth.currentUser?.uid,
      });
      console.log("Log registrado con ID: ", docRef);
    } catch (e) {
      console.error("Error al agregar log: ", e);
    }
  }

  return (
    <View style={styles.content}>
      <View style={styles.space}>
        <View style={styles.contentTitle}>
          <Text style={styles.title}>Desbloquear tu casillero</Text>
        </View>
        <Image
          source={{ uri: "https://imgs.search.brave.com/w7jWaDxDWTrbQ4bMABdrfdnWhQzHVl6TbuTTxlH2mkc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/dmVjdG9yLXByZW1p/dW0vcGVyc29uYS1t/b2NoaWxhLXBpZS1m/cmVudGUtY2FzaWxs/ZXJvLXBlcnNvbmEt/cGllLWRlbGFudGUt/ZWxsb3NfMTAxODM5/NS0yNDU5LmpwZz9z/ZW10PWFpc19oeWJy/aWQ" }}
          style={styles.image}
        />
        <View style={{ alignItems: "center" }}>
          <View style={{ gap: 7 }}>
            <Text style={styles.text}>🔹 Presiona el botón para abrir tu casillero.</Text>
            <Text style={styles.text}>
              🔹 Casillero asignado: {userCasillero || "Cargando..."}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => controlarRele()}
            style={[styles.boton, isLoading && styles.botonDisabled]}
            disabled={isLoading || !userCasillero}
          >
            <Text style={styles.text}>
              {isLoading ? "Procesando..." : "Desbloquear"}
            </Text>
          </TouchableOpacity>


        </View>
      </View>
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
  },
  space: {
    width: "90%",
    height: "75%",
    borderRadius: 16,
    borderColor: "white",
    borderWidth: 0.2,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e1e1e",
  },
  contentTitle: {
    width: "auto",
    height: "20%",
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
  },
  text: {
    fontSize: 14,
    fontFamily: "monospace",
    color: "white",
    textAlign: "center",
  },
  boton: {
    width: "60%",
    height: "auto",
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: "rgb(255, 0, 0)",
    marginTop: 20,
  },
  botonDisabled: {
    backgroundColor: "gray",
    opacity: 0.7,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
});