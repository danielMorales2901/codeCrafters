import { useState, useEffect } from "react";
import { View } from "react-native";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Asegúrate de importar desde el archivo correcto
import LoginScreen from "./auth/login";
import UserScreen from "./(user)";

export default function HomeApp() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpieza del listener al desmontar
  }, []);

  return <View>{user ? <UserScreen /> : <LoginScreen />}</View>;
}
