# MercApp – Micrositio Técnico (Unidad 4)

## 1. Descripción General

MercApp es una aplicación web desarrollada como parte de la Unidad 4 de la asignatura Aplicaciones Web.  
Permite gestionar un catálogo de productos mediante una interfaz SPA (Single Page Application) construida con **Vue 3 + Vite**, con un backend implementado en **Node.js + Express** y base de datos en **MongoDB Atlas**.

El proyecto incluye despliegue completo en la nube:

- **Backend (API REST)** en Railway  
- **Frontend (SPA)** en Netlify  
- **Base de datos NoSQL** en MongoDB Atlas  
- **Sitio estático informativo** en GitHub Pages (este micrositio)

---

## 2. Arquitectura del Sistema

```
[ Frontend – Netlify ]
       |
       | (Fetch/HTTP)
       v
[ Backend – Railway ]
       |
       | (Driver MongoDB)
       v
[ Base de Datos – MongoDB Atlas ]
```

### Tecnologías:

- **Frontend:** Vue 3, Composition API, Vite  
- **Backend:** Node.js, Express, CORS, Mongoose  
- **BBDD:** MongoDB Atlas (Cluster M0)  
- **Despliegue:**  
  - Railway para la API  
  - Netlify para el SPA  
  - GitHub Pages para este micrositio  

---

## 3. Endpoints Principales (API de MercApp)

| Método | Ruta | Descripción |
|--------|--------------|-------------------------------|
| GET | `/api/producto` | Lista todos los productos |
| POST | `/api/producto` | Crea un producto |
| GET | `/api/producto/:id` | Obtiene un producto por ID |
| PUT | `/api/producto/:id` | Actualiza un producto |
| DELETE | `/api/producto/:id` | Elimina un producto |

### Endpoint de salud:

```txt
GET /health
```

---

## 4. Guía para Ejecutar en Entorno Local

### 4.1 Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

El backend corre por defecto en:

```
http://localhost:3000
```

### 4.2 Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend corre en:

```
http://localhost:5173
```

---

## 5. Despliegues en Producción

| Servicio | URL |
|---------|-----|
| **Frontend (Netlify)** | https://mercapp-fsch.netlify.app |
| **Backend (Railway)** | https://mercapp-production.up.railway.app/ |
| **Repositorio GitHub** | https://github.com/fschnabel/MercApp |
| **Micrositio GitHub Pages** | https://fschnabel.github.io/MercApp |


---

## 6. Lecciones Aprendidas

Durante el despliegue se resolvieron varios aspectos clave:

- Configuración de **CORS** para permitir dominios de Netlify y localhost.  
- Manejo de variables de entorno en Railway y Netlify.  
- Integración correcta de `VITE_API_URL` para consumir la API en producción.  
- Uso de proxys en Vite durante desarrollo.  
- Control de errores con Fetch y abortos de solicitud.  

---

## 7. Autor

**Francisco Schnabel**  
Unidad 4 – Aplicaciones Web  
Universidad Politécnica Salesiana  
2025
