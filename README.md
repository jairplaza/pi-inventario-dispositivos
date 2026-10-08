# API REST para Control de Inventario de Dispositivos (NestJS)

Backend desarrollado con **NestJS**, **TypeORM** y **PostgreSQL** para la gestión de un inventario de activos tecnológicos. Incluye relación Categorías–Dispositivos, autenticación con JWT, paginación y búsqueda.

---

## Requisitos previos

* Node.js
* PostgreSQL instalado y en ejecución
* Git

---

## Instalación y ejecución

1. **Clonar el repositorio:**

```bash
git clone https://github.com/jairplaza/pi-inventario-dispositivos.git
cd pi-inventario-dispositivos
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Crear una base de datos vacía** en PostgreSQL:

```sql
CREATE DATABASE inventario_dispositivos_db;
```

4. **Configurar las variables de entorno:** copiar `.env.example` a `.env` y ajustar los valores a tu PostgreSQL local.

5. **Compilar y ejecutar las migraciones** (crean todas las tablas):

```bash
npm run build
npm run migration:run
```

6. **Iniciar la aplicación:**

```bash
npm run start:dev
```

La API queda disponible en `http://localhost:3000`.

---

## Variables de entorno (`.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=inventario_dispositivos_db
JWT_SECRET=un_secreto_largo_y_aleatorio
```

---

## Migraciones

| Script | Función |
| :--- | :--- |
| `npm run migration:generate -- src/migrations/Nombre` | Genera una migración comparando entidades y base de datos |
| `npm run migration:run` | Ejecuta las migraciones pendientes |
| `npm run migration:revert` | Revierte la última migración |

`synchronize` está desactivado: el esquema se gestiona solo con migraciones.

---

## Autenticación

1. Registrar un usuario con `POST /auth/register`:

```json
{ "username": "usuario", "password": "Clave1234!" }
```

2. Iniciar sesión con `POST /auth/login`. Devuelve un `access_token`.
3. En las rutas protegidas, enviar el encabezado `Authorization: Bearer <access_token>`.

---

## Endpoints

| Método | Ruta | Requiere JWT | Descripción |
| :--- | :--- | :---: | :--- |
| **POST** | `/auth/register` | No | Registra un usuario |
| **POST** | `/auth/login` | No | Inicia sesión y devuelve el token |
| **POST** | `/dispositivos` | Sí | Crea un dispositivo (requiere `categoriaId`) |
| **GET** | `/dispositivos` | No | Lista dispositivos con paginación, búsqueda y orden |
| **GET** | `/dispositivos/:id` | No | Consulta un dispositivo por su ID (UUID) |
| **PATCH** | `/dispositivos/:id` | Sí | Actualiza parcialmente un dispositivo |
| **DELETE** | `/dispositivos/:id` | Sí | Elimina un dispositivo |
| **CRUD** | `/categorias` | No | Gestión de categorías |

### Parámetros de `GET /dispositivos`

| Parámetro | Descripción | Por defecto |
| :--- | :--- | :--- |
| `page` | Página (entero, mínimo 1) | 1 |
| `limit` | Registros por página (entero, mínimo 1) | 10 |
| `search` | Filtra por nombre o tipo, sin distinguir mayúsculas | — |
| `order` | `ASC` o `DESC`, por nombre | `ASC` |

La respuesta tiene la forma `{ "data": [...], "meta": { "total", "page", "lastPage", "limit" } }`.

### Códigos de error

* **400:** datos o parámetros inválidos.
* **401:** falta el token o no es válido.
* **404:** recurso no encontrado.
