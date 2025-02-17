import { ModalEmployees } from "@/components/employees/modalEmployees";
import { useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";

const date = new Date().toLocaleDateString();

const data = [
    { id: "1", nombre: "Juan Jimenez", area: "Contabilidad", numTel:"23323232345", Turno:"am" },
    { id: "2", nombre: "Pedro Porros", area: "Control interno", numTel:"7867867877", Turno:"pm" },
    { id: "3", nombre: "Paco Panadero", area: "Auditoria", numTel:"23323232345", Turno:"am" },
    { id: "4", nombre: "Jose Jose", area: "Contabilidad", numTel:"7867867877", Turno:"pm"  },
    { id: "5", nombre: "Jose Maria", area: "Control interno", numTel:"23323232345", Turno:"am" },
    { id: "6", nombre: "Daniel Morales", area: "Auditoria", numTel:"7867867877", Turno:"pm"  },
    { id: "7", nombre: "Miguel Ajal", area: "Contabilidad", numTel:"23323232345", Turno:"am" },
    { id: "8", nombre: "Omar Sanchez", area: "Control interno", numTel:"7867867877", Turno:"pm"  },
    { id: "9", nombre: "Orlando Sanchez", area: "Auditoria", numTel:"23323232345", Turno:"am" },
    { id: "10", nombre: "Josue Lopez", area: "Contabilidad", numTel:"7867867877", Turno:"pm"  },
];

export default function Profile() {

    const [openModal, setOpenModal] = useState(false);

    return (
        <SafeAreaView style={styles.content}>

            <Text style={styles.title}>Datos generales de los empleados</Text>

            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={[styles.cell, styles.header]}>Id</Text>
                    <Text style={[styles.cell, styles.header]}>Nombne</Text>
                    <Text style={[styles.cell, styles.header]}>Area</Text>
                    <Text style={[styles.cell, styles.header]}>Numero de telefono</Text>
                    <Text style={[styles.cell, styles.header]}>Turno</Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => setOpenModal(true)}
                        >
                            <Text style={styles.cell}>{item.id}</Text>
                            <Text style={styles.cell}>{item.nombre}</Text>
                            <Text style={styles.cell}>{item.area}</Text>
                            <Text style={styles.cell}>{item.numTel}</Text>
                            <Text style={styles.cell}>{item.Turno}</Text>
                        </TouchableOpacity>
                    )}
                />
                <ModalEmployees
                    open={!!openModal}
                    onClose={() => setOpenModal(false)}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        paddingBottom: 110,
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "monospace"
    },
    container: {
        margin: 10,
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 5,
        overflow: "hidden",
        width: "95%"
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        backgroundColor: "rgb(222, 249, 227)"
    },
    cell: {
        flex: 1,
        padding: 8,
        textAlign: "center",
    },
    header: {
        fontWeight: "bold",
        backgroundColor: "#f1f1f1",
    },
});
