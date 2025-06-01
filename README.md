# 🎓 InternJobs

**InternJobs** es una aplicación web que conecta a estudiantes con empresas para la búsqueda de prácticas profesionales bajo convenios de colaboración. Permite a los candidatos explorar ofertas, postularse fácilmente y gestionar su perfil. Las empresas pueden publicar ofertas, revisar postulaciones y contactar con los candidatos ideales.

---

## 🛠️ Tecnologías utilizadas

### Frontend
- Vue 3
- Vite
- Tailwind CSS (modo oscuro)
- Vue Router
- Pinia

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt

---

## 🚀 Funcionalidades principales

### 👤 Candidatos
- Registro e inicio de sesión
- Actualización de datos personales y currículum (CV)
- Búsqueda de ofertas de prácticas
- Aplicación a ofertas
- Panel privado con resumen de postulaciones y su estado

### 🏢 Empresas
- Registro e inicio de sesión
- Publicación y gestión de ofertas de prácticas
- Visualización de candidatos postulados a sus ofertas
- Panel privado con administración completa

---

## ⚙️ Instalación local

### 🔧 Requisitos previos
- Node.js v18+
- PostgreSQL

---

### 🖥️ Clonar el repositorio

```bash
git clone https://github.com/oserranom/InternJobs.git
cd internjobs

```markdown
## Backend:
Sustituye el documento ".env.template" por ".env" y configura tus credenciales de conexión local.

```bash
cd frontend
npm i
npm run dev

```markdown
## Frontend
Sustituye el documento ".env.template" por ".env.local" y configura tus credenciales de conexión local.

```bash
cd backend
npm i
npm run dev

```markdown
###Estado del proyecto:

Producto funcional en su v1 lista para la entrega como proyecto académico.

Mejoras pendientes:
- Validaciones adicionales en forms de update.
- Seguridad: Pedir password en las funciones de update.
- Estilos: Responsive en los perfiles de Candidate/Company
- Funciones delete a job_offers, candidates y companies.
- Funcion update a job_offers. 




