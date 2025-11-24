
# MercApp  
Aplicación web desarrollada para la Unidad 3, que permite gestionar un catálogo de productos, visualizar detalles, filtrarlos por categoría y administrarlos mediante operaciones CRUD. Además incluye un carrito de compras persistente con `localStorage`.

Está construida con **Vue 3 (Vite)** en el frontend y **Node.js + Express + MongoDB (Mongoose)** en el backend.

---

## Sobre el proyecto
MercApp nació como un proyecto sencillo y práctico para demostrar el uso de una SPA con Vue 3 utilizando:
- Componentes reutilizables
- Routing dinámico
- Manejo global de estado (carrito)
- Composables (`useApi`, `useProducts`, `useCart`)
- Rutas API REST con Node + Express
- Validaciones de datos y persistencia en MongoDB

La idea es simular una pequeña tienda donde el usuario puede:
- Buscar productos
- Filtrarlos por categoría
- Ver detalles
- Crear nuevos productos
- Editarlos
- Eliminarlos
- Y usar un carrito persistente.

---

## Estructura del proyecto

```
MercApp/
 ├── backend/
 │   ├── src/
 │   │   ├── models/
 │   │   ├── routes/
 │   │   ├── semilla.js
 │   │   └── server.js
 │   └── package.json
 └── frontend/
     ├── src/
     │   ├── views/
     │   ├── components/
     │   ├── composables/
     │   ├── router/
     │   └── assets/
     └── package.json
```

---

##  Tecnologías utilizadas

### **Frontend**
- Vue 3 + Vite  
- Vue Router  
- Composables (Composition API)  
- SPA con lazy loading y `<Suspense>`

### **Backend**
- Node.js + Express  
- MongoDB + Mongoose  
- Validaciones en modelos  
- Rutas CRUD  
- Semilla de datos iniciales

---

## Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/fschnabel/MercApp
cd MercApp
```

---

### 2️⃣ Backend (Node + Express)

```
cd backend
npm install
```

Configura tu `.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/mercapp
PORT=3000
```

Para ejecutar:

```
npm start
```

Cargar datos de prueba:

```
node src/semilla.js
```

---

### 3️⃣ Frontend (Vue 3 + Vite)

```
cd frontend
npm install
npm run dev
```

App ejecutándose en:

```
http://localhost:5173
```

---

## Funcionalidades principales

### Catálogo  
- Búsqueda por texto  
- Filtro por categoría  
- Vista responsive  
- Componente ProductCard

### Detalle del producto  
- `/product/:id`  
- Añadir al carrito  
- Editar producto

### Crear / Editar productos  
- Validaciones completas  
- Formularios con v-model  
- CRUD desde API REST

### ✔ Carrito  
- Agregar / quitar  
- Cantidades  
- Total  
- Persistencia en localStorage

### Categorías  
- CRUD completo  
- Selector en productos

### useApi mejorado  
- `loading`, `data`, `error`  
- Reintentos automáticos  
- Cancelación con AbortController  

---

## Información del estudiante
- **Nombre:** Francisco Schnabel  
- **Curso:** Unidad 3 – Aplicaciones Web con Vue 3  
- **Institución:** Universidad Politécnica Salesiana  

---

## URL del repositorio
```
https://github.com/fschnabel/MercApp
```
