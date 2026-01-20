# Backend Nuvén

Backend service built with Node.js and TypeScript that integrates PostgreSQL and Google Gemini AI to provide intelligent responses through a REST API. The entire environment runs using Docker and Docker Compose, with Prisma as the ORM for database management.

---

## 🚀 Technologies

- Node.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker & Docker Compose
- Google Gemini API
- Swagger (API Documentation)

---

## 🧠 Architecture Overview

The system is composed of:

### 1. API Server
- Built with Node.js and TypeScript
- Exposes REST endpoints
- Handles authentication and business logic
- Integrates with Gemini AI

### 2. Database
- PostgreSQL running in Docker
- Managed via Prisma ORM

### 3. AI Integration
- Google Gemini API
- Used to generate intelligent responses and process natural language

---

## 📦 Project Structure

```
backend-nuven/
│
├── prisma/              # Prisma schema and migrations
├── src/                 # Application source code
├── .dockerignore
├── .env.example         # Environment variables example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ How to Run

### Prerequisites

- Docker
- Docker Compose
- A valid Google Gemini API Key

### Setup

1. Clone the repository:

```bash
git clone https://github.com/Jose-Alberto-Rodrigues-Neto/backend-nuven.git
cd backend-nuven
```

2. Create a `.env` file based on `.env.example` and fill in:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=backendnuven
DATABASE_URL=postgresql://postgres:postgres@database:5432/backendnuven

PORT=8080
JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_gemini_model
```

3. Start the application:

```bash
docker compose up --build
```

4. Access the API:

```
http://localhost:8080
```

Swagger UI:

```
http://localhost:8080/api-docs
```

---

## 🔁 Example Request

```http
POST /ai/chat
{
  "message": "Hello, what can you do?"
}
```

---

## 🎯 Project Purpose

This project aims to demonstrate:

- Integration of modern AI (LLM) services into backend systems
- Clean architecture using TypeScript and Docker
- Secure and scalable API design
- Practical use of ORM and relational databases

---

## 📚 Future Improvements

- Conversation history persistence
- WebSocket or SSE for streaming responses
- User authentication and role management
- Multi-model AI support
- Frontend integration

---

## 👨‍💻 Author

José Alberto Rodrigues Neto  
Fullstack Developer  

GitHub: https://github.com/Jose-Alberto-Rodrigues-Neto  
