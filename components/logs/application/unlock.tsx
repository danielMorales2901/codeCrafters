import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, firebase_db } from '@/lib/firebase'
import { addDoc, collection } from "firebase/firestore";
import { LogType } from "../entities/log";
import { useState } from "react";

export function Unlock() {
    const hola = (hola: string) => {
        Alert.alert("ESTO DEBE SER UN LOG DE USUARIO: ", auth.currentUser?.displayName || hola || "");
    }

    const [user, setUser] = useState<LogType | null>(null)

    const date = new Date();

    async function agregarDatos() {
        try {
            const docRef = await addDoc(collection(firebase_db, "logs"), {
                casillero: 1, /* user?.casillero */
                fecha: date,
                nombre: auth.currentUser?.displayName,
                sensor_id: 1,
                usuario_id: auth.currentUser?.uid,
            });
            Alert.alert("Documento agregado con ID: ", docRef.id);
        } catch (e) {
            Alert.alert("Error al agregar documento: ");
            console.log(e);
        }
    }

    return (
        <View style={styles.content}>
            <View style={styles.spcae}>
                <View style={styles.contentTitle}>
                    <Text style={styles.title}>Desbloquear casillero remotamente</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={{ gap: 7 }}>
                        <Text style={styles.text}>Al ejecutar esta acción, el casillero se abrirá. Es tu responsabilidad asegurarte de la seguridad de tus pertenencias. No nos hacemos responsables por pérdidas, daños o cualquier otro inconveniente.</Text>
                        <Text style={styles.text}>🔹Asegúrate de estar presente al desbloquear.</Text>
                    </View>
                    <TouchableOpacity onPress={() => agregarDatos()} style={styles.boton}>
                        <Text style={styles.text}>Desbloquear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        content: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
        },
        spcae: {
            width: "90%",
            height: "60%",
            borderRadius: 16,
            borderWidth: 2,
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(225, 255, 251, 0.97)"
        },
        contentTitle: {
            width: "auto",
            height: "20%",

        },
        title: {
            fontSize: 22,
            fontWeight: "500",
            textAlign: "center"
        },
        text: {
            fontSize: 14,
            fontFamily: "monospace",

        },
        boton: {
            width: "48%",
            height: "auto",
            padding: 7,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            borderWidth: 2,
            backgroundColor: "rgb(255, 0, 0)",
            marginTop: 20
        },
    }
);