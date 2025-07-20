import { Router } from "express";
import UserRepository from "../repositories/UserRepository.js";
import UserService from "../services/UserService.js";
import UserController from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/auth.js";


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
 * /users/:
 *   get:
 *     summary: Retorna todos os usuários da plataforma
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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

userRoutes.get('/', authMiddleware, (req, res) => userController.getAllUsers(req, res));

/**
 * @swagger
 * /users/auth/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "encryptedUserId123"
 *                     nome:
 *                       type: string
 *                       example: "João da Silva"
 *                     email:
 *                       type: string
 *                       example: "joao@email.com"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 */

userRoutes.post('/auth/login', (req, res) =>{
    userController.login(req, res)
})

/**
 * @swagger
 * /users/auth/register:
 *   post:
 *     summary: Realiza o realiza o cadastro de um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "encryptedUserId123"
 *                     nome:
 *                       type: string
 *                       example: "João da Silva"
 *                     email:
 *                       type: string
 *                       example: "joao@email.com"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 */
userRoutes.post('/auth/register', (req, res) =>{
    userController.register(req, res)
})

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna todos os os dados do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                  type: string
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 senha_hash:
 *                   type: string
 */
userRoutes.get('/me', authMiddleware, (req, res) => userController.getMe(req, res))
export default userRoutes;