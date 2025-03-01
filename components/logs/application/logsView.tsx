import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { LogType } from "../entities/log";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { auth, firebase_db } from "@/lib/firebase";

export function LogsView() {
    const [logs, setLogs] = useState<LogType[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        /*
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                await fetchUserLogs(user.uid);
            } else {
                setUserId(null);
                setLogs([]);
                Alert.alert("No hay un usuario autenticado");
            }
        });
        return () => unsubscribe();
        */
       if (auth.currentUser) {
        fetchUserLogs(auth.currentUser.uid);
       }
    }, []);

    const borrarDocumento = async (documentId: string) => {
        try {
            const documentRef = doc(firebase_db, "logs", documentId);
            await deleteDoc(documentRef);
            setLogs(logs.filter((item) => item.id !== documentId));
            Alert.alert("Documento borrado correctamente!");
        } catch (error) {
            console.error("Error al borrar el documento:", error);
        }
    }
    // Ejemplo de uso:
    //borrarDocumento("TuDocumentId", "TuColeccion"); // Reemplaza con el ID del documento y el nombre de la colección


    const fetchUserLogs = async (uid: string) => {
        try {
            /*
            const q = query(collection(firebase_db, "logs"), where("usuario_id", "==", uid));
            const querySnapshot = await getDocs(q);
            const records: LogType[] = querySnapshot.docs.map((doc) => {
                const docData = doc.data();
                return {
                    id: doc.id, //ID único del documento en Firestore
                    casillero: docData.casillero || "Desconocido",
                    nombre: docData.nombre || "Sin nombre",
                    usuario_id: docData.usuario_id || "Sin usuario",
                    date: new Date(docData.fecha?.seconds * 1000 || 0),
                };
            });
            */
            const q = query(collection(firebase_db, "logs"), where("usuario_id", "==", uid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const records: LogType[] = [];
                querySnapshot.forEach((doc) => {
                    // cities.push(doc.data().name);
                    const docData = doc.data();
                    records.push( {
                        id: doc.id, //ID único del documento en Firestore
                        casillero: docData.casillero || "Desconocido",
                        nombre: docData.nombre || "Sin nombre",
                        usuario_id: docData.usuario_id || "Sin usuario",
                        date: new Date(docData.fecha?.seconds * 1000 || 0),
                    });
                });

                setLogs(records);
            });
            //unsubscribe()
        } catch (error) {
            console.error("Error al obtener registros:", error);
        }
    };

    const renderLogs = ({ item }: { item: LogType }) => (
        <TouchableOpacity
            style={styles.row}
            onLongPress={() => borrarDocumento(item.id,)}
        >
            <Text style={styles.cell}>{item.nombre || "Sin nombre"}</Text>
            <Text style={styles.cell}>{item.casillero || "Sin casillero"}</Text>
            <Text style={styles.cell}>{item.date.toLocaleDateString() || ""}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.content}>
            <Text style={styles.title}>Historial</Text>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.header]}>Nombre</Text>
                    <Text style={[styles.cell, styles.header]}>Casillero</Text>
                    <Text style={[styles.cell, styles.header]}>Fecha</Text>
                </View>
                <FlatList
                    data={logs}
                    renderItem={renderLogs}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "black",
        paddingBottom: 100,
        padding: 5,
    },
    header: {
        fontWeight: "bold",
        backgroundColor: "#f1f1f1",
    },
    container: {
        margin: 10,
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 5,
        overflow: "hidden",
        width: "95%",
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 5,
        paddingTop: 5,
        color: "white"
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        backgroundColor: "rgb(217, 246, 253)",
    },
    cell: {
        flex: 1,
        padding: 8,
        textAlign: "center",
    },
});
