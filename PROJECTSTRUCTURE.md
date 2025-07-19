# 🎯 **Estrutura Completa do Projeto**
```bash
backend/
│── src/
│   ├── controllers/    # Controladores
│   │   ├── userController.ts
│   ├── routes/         # Rotas
│   │   ├── userRoutes.ts
│   ├── middlewares/    # Middlewares
│   │   ├── authMiddleware.ts
│   ├── models/         # Banco de Dados (DB)
│   │   ├── userModel.ts
│   ├── dtos/           # Data Transfer Objects (DTOs)
│   │   ├── userDto.ts
│   ├── config/         # Configuração do Banco de Dados
│   │   ├── database.ts
│   ├── app.ts          # Configuração do Express
│   ├── server.ts       # Inicialização do servidor
│── package.json
│── tsconfig.json
│── .env                # Variáveis de ambiente
```

---

# ✅ **1. Configuração do Banco de Dados (DB)**
Vamos usar **Prisma ORM** para interagir com o banco de dados.

### 📄 **`config/database.ts`**
```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

---

# ✅ **2. Criando o Model (DB)**
O **Model** gerencia a interação com o banco.

### 📄 **`models/userModel.ts`**
```typescript
import prisma from "../config/database";

export class UserModel {
    async findById(id: number) {
        return await prisma.user.findUnique({
            where: { id },
        });
    }

    async createUser(name: string, email: string) {
        return await prisma.user.create({
            data: { name, email },
        });
    }
}

export default new UserModel();
```

---

# ✅ **3. Criando DTOs**
Os **DTOs (Data Transfer Objects)** garantem que os dados enviados e recebidos tenham a estrutura correta.

### 📄 **`dtos/userDto.ts`**
```typescript
export interface CreateUserDto {
    name: string;
    email: string;
}

export interface UserResponseDto {
    id: number;
    name: string;
    email: string;
}
```

---

# ✅ **4. Criando o Controller**
O **Controller** recebe os dados do **DTO**, chama o **Model** e retorna uma resposta formatada.

### 📄 **`controllers/userController.ts`**
```typescript
import { Request, Response } from "express";
import UserModel from "../models/userModel";
import { CreateUserDto, UserResponseDto } from "../dtos/userDto";

export class UserController {
    async getUser(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const userResponse: UserResponseDto = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        res.json(userResponse);
    }

    async createUser(req: Request, res: Response) {
        const userData: CreateUserDto = req.body;
        const newUser = await UserModel.createUser(userData.name, userData.email);

        const userResponse: UserResponseDto = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        };

        res.status(201).json(userResponse);
    }
}

export default new UserController();
```

---

# ✅ **5. Criando as Rotas**
### 📄 **`routes/userRoutes.ts`**
```typescript
import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

router.get("/user/:id", UserController.getUser);
router.post("/user", UserController.createUser);

export default router;
```

---

# ✅ **6. Configuração do Express**
### 📄 **`app.ts`**
```typescript
import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

export default app;
```

---

# ✅ **7. Inicializando o Servidor**
### 📄 **`server.ts`**
```typescript
import app from "./app";

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

---

# 🚀 **Executando o Projeto**
1️⃣ Instale as dependências:
```sh
npm install express prisma @prisma/client
npm install --save-dev @types/express typescript ts-node-dev
```

2️⃣ **Crie o banco de dados** (exemplo com SQLite no `prisma/schema.prisma`):
```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

3️⃣ **Rode as migrations**:
```sh
npx prisma migrate dev --name init
```

4️⃣ **Inicie o servidor**:
```sh
npm run dev
```

5️⃣ **Testando a API**
- **Criar um usuário**:  
  ```
  POST http://localhost:3000/api/user
  Body: { "name": "Alice", "email": "alice@email.com" }
  ```
- **Buscar um usuário**:  
  ```
  GET http://localhost:3000/api/user/1
  ```

---

# 🎯 **Resumo**
✔ **DB (Database)** → Gerencia a persistência de dados.  
✔ **DTOs** → Garantem que os dados trafeguem no formato correto.  
✔ **Controllers** → Processam a lógica das requisições.  
✔ **Routes** → Definem os endpoints da API.  
✔ **Middlewares** → Interceptam requisições para autenticação/validação.  

Essa estrutura modular facilita **manutenção, escalabilidade e organização** do código. 🚀🔥