# 🔐 Safe Touch

**Safe Touch** es un sistema de apertura de casilleros basado en autenticación biométrica por huella dactilar. Este proyecto fue desarrollado como parte de una iniciativa académica en la Universidad Tecnológica de Izúcar de Matamoros, con el objetivo de ofrecer una solución segura, eficiente y moderna para el acceso a espacios de almacenamiento.

> ⚠️ **Nota:** Este repositorio contiene únicamente la aplicación móvil desarrollada con Expo como parte del sistema *Safe Touch*. No incluye el código del microcontrolador, la aplicación web ni el hardware físico.

## 🎯 Objetivo del Proyecto

Diseñar e implementar un sistema de acceso seguro que elimine el uso de llaves físicas o contraseñas vulnerables, utilizando biometría como método principal de autenticación.

## 🧩 Componentes del Sistema

- **Módulo biométrico**: Sensor de huella dactilar (AS608) conectado a una placa Arduino Uno R3.
- **Casilleros físicos**: Compartimentos metálicos controlados electrónicamente.
- **Aplicación web**: Interfaz para la gestión de usuarios, monitoreo de accesos y control remoto del sistema.
- **Aplicación móvil**: Prototipo desarrollado con Expo para interacción y visualización desde dispositivos móviles (contenido de este repositorio).

## ⚙️ Tecnologías Utilizadas

- **Expo + React Native** (aplicación móvil)
- **TypeScript**
- **Arduino Uno R3** (hardware)
- **Sensor biométrico AS608**
- **HTML, CSS, JavaScript** (aplicación web)
- **Node.js / Express** (backend sugerido)

## 🚀 Características Principales

- Registro de hasta **50 huellas dactilares únicas**
- Apertura de casilleros en **menos de 2 segundos**
- **Monitoreo en tiempo real** desde la aplicación web
- Arquitectura modular para facilitar la escalabilidad

## 🛠️ Instalación de la App Móvil

```
bash
git clone https://github.com/danielMorales2901/codeCrafters.git
cd codeCrafters
npm install
npx expo start
```

📁 Estructura del Proyecto
codeCrafters/
├── app/              # Tu código principal va aquí

├── app-example/      # Ejemplo de implementación funcional

├── components/       # Componentes reutilizables

├── constants/        # Constantes globales

├── hooks/            # Custom hooks

├── lib/              # Funciones auxiliares

├── assets/           # Imágenes y recursos

├── scripts/          # Scripts personalizados

├── .idea/            # Configuración del IDE

├── package.json      # Dependencias y scripts

└── tsconfig.json     # Configuración de TypeScript


🧪 Fases del Desarrollo
- Diseño y configuración del módulo biométrico
- Desarrollo de la aplicación web
- Desarrollo de la aplicación móvil (este repositorio)
- Integración y pruebas del sistema completo
📈 Resultados Esperados
- Alta eficiencia en la autenticación biométrica
- Interfaz intuitiva para gestión de usuarios
- Posibilidad de escalar el sistema a más casilleros
- Implementación de respaldo energético para mayor confiabilidad
📚 Documentación Técnica
Este proyecto fue documentado en el reporte técnico titulado:
Safe Touch: Sistema de Apertura Biométrica por Huella Dactilar
Autores: Josué López Herrera, Daniel Olivares Morales, Moisés Emmanuel Castillo Arias
Universidad Tecnológica de Izúcar de Matamoros

🤝 Créditos
Desarrollado por estudiantes de TI-DSM:
- Josué López Herrera – Programación de microcontroladores
- Daniel Olivares Morales – Integración de hardware y desarrollo móvil
- Moisés Emmanuel Castillo Arias – Desarrollo web y gestión de proyectos

📄 Licencia
Este proyecto está bajo la licencia MIT.

