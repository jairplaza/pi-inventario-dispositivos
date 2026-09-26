#  API REST para Control de Inventario de Dispositivos (NestJS)

Backend desarrollado con **NestJS**, **TypeORM** y **PostgreSQL** para la gestión de un inventario de activos tecnológicos.

---

##  Requisitos previos
* Node.js
* PostgreSQL instalado y configurado
* Git

---

##  Configuración y Ejecución

1. **Clonar el repositorio:**
   ```bash
git clone https://github.com/jairplaza/pi-inventario-dispositivos.git
cd pi-inventario-dispositivos

---

##  Endpoints de la API

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **POST** | `/dispositivos` | Crea un nuevo dispositivo tecnológico. |
| **GET** | `/dispositivos` | Obtiene la lista completa de dispositivos registrados. |
| **GET** | `/dispositivos/:id` | Consulta un dispositivo específico por su ID (UUID). |
| **PATCH** | `/dispositivos/:id` | Actualiza de forma parcial los datos de un dispositivo. |
| **DELETE** | `/dispositivos/:id` | Elimina un dispositivo del inventario. |

---

##  Variables de Entorno (`.env`)

El proyecto requiere la configuración de un archivo `.env` basado en la plantilla `.env.example` provista en la raíz del repositorio:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña de postgre
DB_NAME=inventario_db

## Instrucciones de Ejecución

1. Instalar todas las dependencias del proyecto ejecutando:
   `npm install`.

2. Configurar las variables de entorno duplicando el archivo `.env.example` para renombrarlo a `.env`, asegurándote de ajustar los parámetros de conexión de tu base de datos PostgreSQL local.

3. Ejecutar la aplicación en modo desarrollo con el comando:
   `npm run start:dev`.

Una vez realizado esto, la API se iniciará y estará disponible por defecto en `http://localhost:3000`.
