import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useFonts } from "expo-font";


SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData)
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (loaded)
      SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    if (loaded && !user) {
      router.replace("/auth/login");
    }
  }, [loaded, user]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(home)"
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
            drawerIcon: ({ color }) => (
              <MaterialIcons size={28} name="home" color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="(user)"
          options={{
            drawerLabel: 'Registro de casillero',
            title: 'Registro de casillero',
            drawerIcon: ({ color }) => (
              <MaterialIcons size={28} name="assignment" color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="auth/profile"
          options={{
            drawerLabel: 'Perfil',
            title: 'Perfil',
            drawerIcon: ({ color }) => (
              <MaterialIcons size={28} name="account-circle" color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="auth/login"
          options={{
            title: "Inicio de sesión",
            drawerItemStyle: { display: 'none' }
          }}
        />

        <Drawer.Screen
          name="changePass/change"
          options={{
            title: "Cambiar contraseña",
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="change/index"
          options={{
            drawerItemStyle: { display: 'none' }
          }}
        />
        <Drawer.Screen
          name="changes/changePasswordHome"
          options={{
            drawerItemStyle: { display: 'none' }
          }}
        />

        <Drawer.Screen
          name="index"
          options={{
            title: "Inicio de sesión",
            drawerItemStyle: { display: 'none' },
          }}
        />

        <Drawer.Screen
          name="+not-found"
          options={{
            title: "Ehh esta mal",
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}


