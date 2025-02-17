import { Alert } from "react-native";

//dataSource.ts
export class DataSource {
    constructor() { }
    //crear metodo
    async helloEmployee() {
        return Alert.alert("Mensaje del dataSource") ;
    }
}