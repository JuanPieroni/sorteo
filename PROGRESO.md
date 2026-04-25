# 📱 App Sorteo Chouette Backgammon - Progreso

## 🎯 Objetivo del Proyecto
App para organizar mesas de backgammon en torneos de chouette.

### Reglas del juego:
- **2-5 jugadores**: 1 mesa, no se sortea
- **6-10 jugadores**: 2 mesas (sorteo para dividir)
- **11-15 jugadores**: 3 mesas
- **Mínimo por mesa**: 3 jugadores
- **Máximo por mesa**: 5 jugadores

---

## 📊 Estado Actual

### ✅ Completado
- [x] Configuración inicial del proyecto (Expo SDK 54)
- [x] Estructura de navegación con tabs (Sorteo, Participantes, Historial)
- [x] Sistema de gestión de participantes (agregar/eliminar)
- [x] Store con Zustand para manejo de estado
- [x] Diseño UI con tema personalizado
- [x] Animaciones básicas
- [x] Historial de sorteos
- [x] Selector de mesas con botones + y -
- [x] Lógica de división de jugadores en mesas (dividirEnMesas)
- [x] Pantalla de resultado mostrando mesas con jugadores
- [x] Historial actualizado mostrando mesas por sorteo

### 🔄 Funcionalidad Actual
**Sorteo de mesas**: Divide jugadores aleatoriamente en N mesas elegidas por el usuario

---

## 🚧 Por Hacer

### Prioridad ALTA
- [ ] Compartir resultado (WhatsApp / copiar texto)
- [ ] Botón "Re-sortear" en pantalla de resultado (sin volver atrás)
- [ ] Preview de mesas antes de sortear (ej: "6 jugadores en 2 mesas = 3 por mesa")
- [ ] Guardar jugadores favoritos (no tener que escribir siempre)
- [ ] **Animación de suspenso al sortear**: mostrar nombres mezclándose visualmente antes de revelar el resultado (que se note la aleatoriedad, si es muy rápido parece desconfiado)

### Prioridad MEDIA
- [ ] Evitar repetir parejas de sorteos anteriores (usar historial)
- [ ] Balanceo inteligente si llega un jugador tarde
- [ ] Acciones en pestañas (mejorar UX)
- [ ] Validación visual: advertencia si hay pocas personas para muchas mesas

### Prioridad BAJA
- [ ] Timer por mesa
- [ ] Estadísticas (quién jugó con quién más veces)
- [ ] Modo oscuro
- [ ] Sonidos al sortear

---

## 🚀 Distribución / Publicación

### ¿Cómo compartir la app?

#### Opción 1: Expo Go (lo que usás ahora)
- Solo funciona si todos tienen Expo Go instalado
- Compartís el link `exp://...` o el QR
- **Limitación**: necesita que tu servidor esté corriendo

#### Opción 2: EAS Build (recomendado ⭐)
- Expo compila la app en la nube y te da un `.apk` (Android) o `.ipa` (iOS)
- Compartís el archivo y cualquiera lo instala
- **Comandos:**
```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```
- Te genera un link de descarga directo

#### Opción 3: Google Play Store / App Store
- Para distribución pública masiva
- Requiere cuenta de desarrollador (Google: u$s 25 único pago / Apple: u$s 99/año)
- Proceso más largo pero cualquiera la descarga

#### Opción 4: Expo Snack
- Para compartir y probar en el navegador (solo para demos)

### 📋 Pendiente aprender:
- [ ] Configurar EAS Build para generar APK
- [ ] Crear cuenta en Expo (expo.dev)
- [ ] Entender diferencia entre `preview` build y `production` build

---

## 🗂️ Estructura del Proyecto

```
sorteo/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Pantalla principal de sorteo + selector de mesas
│   │   ├── participantes.tsx  # Gestión de jugadores
│   │   └── historial.tsx      # Historial de sorteos con mesas
│   ├── _layout.tsx            # Layout raíz
│   └── resultado.tsx          # Pantalla de resultado con mesas
├── store/
│   └── sorteoStore.ts         # Estado global (Zustand) - dividirEnMesas()
├── constants/
│   └── theme.ts               # Colores, espaciados, tipografía
└── assets/                    # Imágenes e iconos
```

---

## 🛠️ Tecnologías

- **Framework**: Expo (React Native)
- **Lenguaje**: TypeScript
- **Navegación**: Expo Router
- **Estado**: Zustand
- **Queries**: TanStack React Query
- **SDK**: Expo 54

---

## 📝 Notas de Desarrollo

### Sesión 1
- Proyecto creado con Expo SDK 55
- Bajado a SDK 54 para compatibilidad con Expo Go (Play Store)
- Identificada necesidad de cambiar lógica de sorteo simple a división de mesas

### Sesión 2
- Cambiada lógica completa: de `drawWinner()` a `dividirEnMesas()`
- Agregado selector de mesas con botones + y - en pantalla principal
- Actualizada pantalla de resultado para mostrar mesas con jugadores
- Actualizado historial para mostrar mesas por sorteo
- Resueltos conflictos de versiones de dependencias
- App funcionando correctamente en dispositivo Android

### Próximos Pasos
1. Mejorar UX/UI de las pestañas
2. Agregar botón "Re-sortear" en resultado
3. Agregar función de compartir resultado
4. Guardar jugadores favoritos

---

## 🎓 Aprendizaje (Modo Profesor)

### Conceptos Clave para Entender:
- **Componentes**: Bloques reutilizables de UI
- **Estado (State)**: Datos que cambian en la app
- **Props**: Datos que pasás entre componentes
- **Hooks**: Funciones especiales de React (useState, useEffect, etc.)
- **Store (Zustand)**: Lugar centralizado para guardar datos globales
- **TypeScript**: JavaScript con tipos (evita errores antes de ejecutar)

### Archivos Importantes:
- `sorteoStore.ts`: Cerebro de la app (lógica de negocio)
- `index.tsx`: Pantalla principal donde se hace el sorteo
- `resultado.tsx`: Muestra el resultado del sorteo con mesas
- `historial.tsx`: Muestra sorteos anteriores

---

## 🐛 Problemas Conocidos
- Warning "runtime not ready" al iniciar (se puede ignorar con dismiss)

---

## 📞 Comandos Útiles

```bash
# Iniciar app
npx expo start

# Limpiar caché
npx expo start --clear

# Reinstalar dependencias desde cero
rm -rf node_modules package-lock.json && npm install --legacy-peer-deps --ignore-scripts
```

---

**Última actualización**: Sesión 2
**Versión**: 2.0.0 (división de mesas ✅)
**Próxima versión**: 2.1.0 (UX/UI mejorado + Re-sortear + Compartir)
