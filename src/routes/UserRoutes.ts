import { Router } from "express";
import UserRepository from "../repositories/UserRepository.js";
import UserService from "../services/UserService.js";
import UserController from "../controllers/UserController.js";


const userRoutes = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operações realizadas na tabela de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários da plataforma
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                   senha_hash:
 *                     type: string
 */


userRoutes.get('/', (req, res) => userController.getAllUsers(req, res));
userRoutes.post('/register', (req, res) =>{
    userController.register(req, res)
})

export default userRoutes;