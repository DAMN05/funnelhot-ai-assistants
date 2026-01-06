# 🤖 Sistema de Gestión de Asistentes IA

Aplicación web desarrollada con **Next.js 15**, **TypeScript** y **Tailwind CSS** para la gestión y entrenamiento de asistentes de inteligencia artificial.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Decisiones Técnicas](#-decisiones-técnicas)
- [Características Implementadas](#-características-implementadas)
- [Mejoras Futuras](#-mejoras-futuras)
- [Tiempo de Desarrollo](#-tiempo-de-desarrollo)

## ✨ Características

- ✅ **Gestión Completa de Asistentes**: Crear, editar, eliminar y listar asistentes de IA
- ✅ **Modal de 2 Pasos**: Proceso guiado para configurar asistentes
- ✅ **Validaciones en Tiempo Real**: Validación de formularios con feedback inmediato
- ✅ **Configuración de Respuestas**: Control de porcentaje de respuestas (cortas, medias, largas)
- ✅ **Entrenamiento de Asistentes**: Área para definir reglas y comportamiento
- ✅ **Chat Simulado**: Interfaz de chat con respuestas aleatorias y delay realista
- ✅ **Persistencia de Datos**: Almacenamiento local con localStorage
- ✅ **Diseño Responsive**: Interfaz adaptable a móviles, tablets y desktop
- ✅ **Estados de Carga**: Feedback visual durante operaciones asíncronas
- ✅ **Animaciones Suaves**: Transiciones y animaciones para mejor UX

## 🛠 Tecnologías Utilizadas

### Core
- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Estilos utility-first para diseño rápido y consistente

### Herramientas
- **ESLint** - Linting de código
- **Prettier** - Formateo de código (configurado)
- **localStorage API** - Persistencia de datos en el navegador

### Características de Next.js Utilizadas
- App Router (estructura moderna de rutas)
- Client Components (`"use client"`)
- Rutas dinámicas (`[id]`)
- Optimización automática de imágenes y fuentes

## 📦 Requisitos Previos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd ai-assistants-manager
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**

Navegar a [http://localhost:3000](http://localhost:3000)

## 📖 Uso

### Página Principal

1. **Ver Asistentes**: La página principal muestra todos los asistentes creados
2. **Crear Asistente**: Click en "Crear Asistente" para abrir el modal
3. **Editar**: Click en "Editar" en cualquier tarjeta de asistente
4. **Eliminar**: Click en "Eliminar" (requiere confirmación)
5. **Entrenar**: Click en "Entrenar" para ir a la página de entrenamiento

### Modal de Creación/Edición

**Paso 1 - Datos Básicos:**
- Nombre del asistente (mínimo 3 caracteres)
- Idioma (Español, Inglés, Portugués)
- Tono/Personalidad (Formal, Casual, Profesional, Amigable)

**Paso 2 - Configuración de Respuestas:**
- Ajustar porcentajes de respuestas (cortas, medias, largas)
- La suma debe ser exactamente 100%
- Habilitar/deshabilitar respuestas de audio

### Página de Entrenamiento

1. **Entrenamiento**: Escribir instrucciones/prompts en el área de texto
2. **Chat Simulado**: Probar el asistente con mensajes
3. **Reiniciar Chat**: Limpiar el historial de conversación

## 📁 Estructura del Proyecto
```
ai-assistants-manager/
├── src/
│   ├── app/
│   │   ├── [id]/
│   │   │   └── page.tsx          # Página de entrenamiento
│   │   ├── layout.tsx             # Layout principal
│   │   ├── page.tsx               # Página principal
│   │   └── globals.css            # Estilos globales
│   ├── components/
│   │   ├── assistants/
│   │   │   ├── AssistantCard.tsx        # Tarjeta de asistente
│   │   │   ├── AssistantModal.tsx       # Modal principal
│   │   │   ├── Modal1.tsx  # Paso 1 del modal
│   │   │   ├── Modal2.tsx  # Paso 2 del modal
│   │   │   ├── ChatInput.tsx            # Input del chat
│   │   │   ├── ChatMessage.tsx          # Mensaje del chat
│   │   │   └── EmptyState.tsx           # Estado vacío
│   │   └── ui/
│   │       ├── Button.tsx               # Componente de botón
│   │       ├── Checkbox.tsx             # Componente de checkbox
│   │       ├── Input.tsx                # Componente de input
│   │       ├── Modal.tsx                # Componente de modal base
│   │       ├── Select.tsx               # Componente de select
│   │       └── Slider.tsx               # Componente de slider
│   ├── data/
│   │   └── chatResponses.ts       # Respuestas simuladas del chat
│   ├── lib/
│   │   └── storage.ts             # Servicio de localStorage
│   ├── types/
│   │   └── assistant.ts           # Definiciones de tipos
│   └── utils/                     # Utilidades (si se necesitan)
├── public/                        # Archivos estáticos
├── .prettierrc                    # Configuración de Prettier
├── next.config.ts                 # Configuración de Next.js
├── tailwind.config.ts             # Configuración de Tailwind
├── tsconfig.json                  # Configuración de TypeScript
└── package.json
```

## 🎯 Decisiones Técnicas

### 1. **Next.js con App Router**
**Por qué:** El App Router es la arquitectura moderna recomendada de Next.js, ofrece mejor performance y experiencia de desarrollo con Server/Client Components.

### 2. **TypeScript**
**Por qué:** Proporciona tipado estático, autocomplete mejorado, detección temprana de errores y mejor mantenibilidad del código.

### 3. **Tailwind CSS**
**Por qué:** 
- Desarrollo rápido con utility classes
- Consistencia visual automática
- Tamaño optimizado del CSS en producción
- Excelente soporte para responsive design
- Paleta de colores personalizada fácil de mantener

### 4. **localStorage para Persistencia**
**Por qué:** 
- Simplicidad: No requiere backend ni base de datos
- Cumple con los requisitos de la prueba técnica
- Suficiente para un MVP o demostración
- Fácil de migrar a una solución backend en el futuro

### 5. **Componentes Reutilizables**
**Por qué:** 
- Principio DRY (Don't Repeat Yourself)
- Facilita el mantenimiento y testing
- Consistencia en toda la aplicación
- Escalabilidad para futuras features

### 6. **Validaciones en el Cliente**
**Por qué:**
- Feedback inmediato al usuario
- Mejor experiencia de usuario
- Reduce errores antes de guardar datos

### 7. **Arquitectura de Carpetas por Feature**
**Por qué:**
- Organización clara y escalable
- Fácil localización de componentes relacionados
- Separación de responsabilidades (UI genérica vs específica de dominio)

## ✅ Características Implementadas

### Funcionalidades Core
- [x] Listado de asistentes con tarjetas informativas
- [x] Crear nuevos asistentes
- [x] Editar asistentes existentes
- [x] Eliminar asistentes con confirmación
- [x] Modal de 2 pasos con indicador visual
- [x] Validación de formularios
- [x] Control de porcentajes (suma = 100%)
- [x] Página de entrenamiento
- [x] Chat simulado con respuestas aleatorias
- [x] Persistencia en localStorage
- [x] Estado vacío cuando no hay asistentes

### UI/UX
- [x] Diseño responsive (mobile-first)
- [x] Animaciones y transiciones suaves
- [x] Estados de carga (loading, typing)
- [x] Feedback visual en todas las acciones
- [x] Paleta de colores personalizada y moderna
- [x] Iconografía consistente (SVG inline)
- [x] Hover states en elementos interactivos
- [x] Mensajes de error claros
- [x] Confirmaciones antes de acciones destructivas

### Código
- [x] TypeScript en todos los archivos
- [x] Componentes reutilizables bien documentados
- [x] Nombres descriptivos de variables y funciones
- [x] Separación de lógica y presentación
- [x] Manejo apropiado de errores
- [x] Código limpio y mantenible

## 🚀 Mejoras Futuras

Si tuviera más tiempo, implementaría:

### Funcionalidades
- [ ] Búsqueda y filtrado de asistentes
- [ ] Ordenamiento de asistentes (por nombre, fecha, etc.)
- [ ] Duplicar asistentes
- [ ] Exportar/importar configuraciones
- [ ] Historial de versiones de entrenamiento
- [ ] Múltiples perfiles de respuesta
- [ ] Integración con APIs de IA reales (OpenAI, Anthropic)

### UI/UX
- [ ] Tema oscuro (dark mode)
- [ ] Animaciones más complejas con Framer Motion
- [ ] Drag & drop para reordenar
- [ ] Atajos de teclado
- [ ] Tour guiado para nuevos usuarios
- [ ] Notificaciones toast en lugar de alerts

### Técnico
- [ ] Tests unitarios (Jest + React Testing Library)
- [ ] Tests E2E (Playwright)
- [ ] Migración a una base de datos real
- [ ] Backend API con autenticación
- [ ] CI/CD pipeline
- [ ] Analytics y tracking de uso
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)

## ⏱ Tiempo de Desarrollo

**Tiempo aproximado:** 6-8 horas

**Desglose:**
- Setup inicial y estructura: 30 min
- Componentes UI base: 1 hora
- Página principal y tarjetas: 1.5 horas
- Modal de creación/edición: 2 horas
- Página de entrenamiento y chat: 2 horas
- Ajustes de diseño y UX: 1 hora
- Testing manual y fixes: 1 hora
- Documentación (README): 30 min

---

## 📝 Notas Adicionales

### Datos de Ejemplo
La aplicación se inicializa con 2 asistentes de ejemplo:
1. **Asistente de Ventas** (Español, Profesional)
2. **Soporte Técnico** (Inglés, Amigable)

Estos datos se cargan automáticamente la primera vez que se usa la aplicación.

### Navegadores Soportados
- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)

### Limitaciones Conocidas
- localStorage tiene un límite de ~5-10MB dependiendo del navegador
- Los datos se pierden si se limpia el caché del navegador
- No hay sincronización entre pestañas/dispositivos

---

Desarrollado como prueba técnica para **Funnelhot** 🚀