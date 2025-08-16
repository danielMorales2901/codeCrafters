//componente para perfil de usuario
import { useState, useEffect } from 'react'
import { StyleSheet, View, Alert, TextInput, Button, Text, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { signOut, updateProfile, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { firebase_db } from '@/lib/firebase' // Your Firebase initialization
import { Link } from 'expo-router'
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

export function ProfileView() {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [user, setUser] = useState<User | null>(null)

  const logout = () => {
    setName("")
    setUser(null)

    signOut(auth)
  }

  // Ahora buscamos el documento por el campo 'email'
  async function getUserDocumentId(email: string) {
    try {
      const usersRef = collection(firebase_db, 'users');
      const q = query(usersRef, where('correo', '==', email)); // Buscamos por email
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return userDoc.id;
      } else {
        throw new Error('No se encontró el usuario en Firestore');
      }
    } catch (error) {
      console.error('Error buscando el documento:', error);
      return null;
    }
  }

  const saveProfile = async () => {
    if (!auth.currentUser) return;

    try {
      // 1. Actualizar el nombre en Firebase Authentication
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      // Usamos el email para buscar el documento en la colección 'users'
      const userDocId = await getUserDocumentId(auth.currentUser.email!);

      if (userDocId) {
        // 3. Actualizar el nombre en la colección "users" en Firestore
        const userDocRef = doc(firebase_db, 'users', userDocId);
        await updateDoc(userDocRef, {
          nombre: name, 
        });
        Alert.alert("Datos actualizados correctamente")

      } else {
        Alert.alert('No se pudo encontrar el documento del usuario en Firestore.');
      }

    } catch (error: any) {
      Alert.alert(`Error: ${error.message}`);
      console.error("Error al actualizar el perfil:", error);
    }
  };

  //obtener la informacion del usuario
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser)
      setName(auth.currentUser.displayName || "");
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.spcae}>
        <View style={styles.contentTitle}>
          <Text style={styles.title}>Datos del usuario</Text>
        </View>
        <View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Email"
              value={user?.email || ""}
              readOnly
            />
          </View>

          <View>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Sin nombre"
              value={name}
              onChangeText={(text) => setName(text)} />
          </View>

          <View style={styles.contentBotones}>
            <View style={styles.orientacionBotones}>
              <TouchableOpacity
                style={[styles.botones, styles.botonActualizar]}
                onPress={() => saveProfile()}
                disabled={!user}
              >
                <Text style={styles.textBoton}>{!user ? 'Cargando ...' : 'Actualizar'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botones, styles.botonCerrar]}
                onPress={logout} >
                <Text style={styles.textBoton}>Cerrrar sesión</Text>
              </TouchableOpacity>
            </View>
            <Link href="/changePass/change" asChild>
              <Pressable style={styles.button}>
                <Text style={styles.textButton}>Cambiar contraseña</Text>
              </Pressable>
            </Link>
          </View>

        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#121212",
    },
    contentTitle: {
      width: "auto",
      height: "20%",
    },
    title: {
      fontSize: 22,
      fontWeight: "500",
      color: "white",
      fontFamily: "monospace"
    },
    spcae: {
      width: "90%",
      height: "60%",
      borderRadius: 16,
      borderWidth: .2,
      borderColor: "white",
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#1e1e1e",
    },
    spaceContent: {
      width: "80%",
      height: "auto",
      padding: 5,
      gap: 3,
    },
    contentInput: {
      fontSize: 14,
      borderBottomColor: "gray",
      borderBottomWidth: 2,
      backgroundColor: "rgb(242, 241, 241)",
      borderRadius: 16,
      paddingLeft: 7,
      fontFamily: "monospace",
    },
    label: {
      fontSize: 18,
      fontFamily: "monospace",
      color: "gray"
    },
    contentBotones: {
      justifyContent: "center",
      alignItems: "center",
    },
    orientacionBotones: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      width: "100%",
      height: "auto",
      padding: 5,
      marginTop: 15,
      marginBottom: 15,
    },
    botones: {
      width: "48%",
      height: "auto",
      padding: 7,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 16,
      borderWidth: 2,
    },
    botonActualizar: {
      backgroundColor: "#bfc2c5"
    },
    botonCerrar: {
      backgroundColor: "#9c27b0"
    },
    textBoton: {
      fontSize: 14,
      fontFamily: "monospace",
      color: "black"
    },
    button: {
      width: "50%",
      height: "auto",
      padding: 5,
      textAlign: "center",
      // backgroundColor: "rgba(126, 160, 252, 0.76)",
    },
    textButton: {
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
      color: "gray",
      textDecorationLine: "underline",
      fontFamily: "monospace"
    },
  }
)
