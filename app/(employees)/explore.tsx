import { DataSource } from "@/components/employees/dataSource";
import { ModalEmployees } from "@/components/employees/modalEmployees";
import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";

const date = new Date().toLocaleDateString();

const data = [
  { id: "1", nombre: "Juan Jimenez", area: "Contabilidad", fecha: date, estatus: "Asistio" },
  { id: "2", nombre: "Pedro Porros", area: "Control interno", fecha: date, estatus: "Ausente" },
  { id: "3", nombre: "Paco Panadero", area: "Auditoria", fecha: date, estatus: "Asistio" },
  { id: "4", nombre: "Jose Jose", area: "Contabilidad", fecha: date, estatus: "Asistio" },
  { id: "5", nombre: "Jose Maria", area: "Control interno", fecha: date, estatus: "Ausente" },
  { id: "6", nombre: "Daniel Morales", area: "Auditoria", fecha: date, estatus: "Asistio" },
  { id: "7", nombre: "Miguel Ajal", area: "Contabilidad", fecha: date, estatus: "Asistio" },
  { id: "8", nombre: "Omar Sanchez", area: "Control interno", fecha: date, estatus: "Ausente" },
  { id: "9", nombre: "Orlando Sanchez", area: "Auditoria", fecha: date, estatus: "Asistio" },
  { id: "10", nombre: "Josue Lopez", area: "Contabilidad", fecha: date, estatus: "Asistio" },
];

export default function Explore() {

  const dataSource = new DataSource();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dataSource.helloEmployee();
  })

  return (
    <SafeAreaView style={styles.content}>

      <Text style={styles.title}>Empleados</Text>

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.header]}>Nombne</Text>
          <Text style={[styles.cell, styles.header]}>Area</Text>
          <Text style={[styles.cell, styles.header]}>Fecha</Text>
          <Text style={[styles.cell, styles.header]}>Asistio / Ausente</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => setOpenModal(true)}
            >
              <Text style={styles.cell}>{item.nombre}</Text>
              <Text style={styles.cell}>{item.area}</Text>
              <Text style={styles.cell}>{item.fecha}</Text>
              <Text style={styles.cell}>{item.estatus}</Text>
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
    paddingBottom: 100,
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
