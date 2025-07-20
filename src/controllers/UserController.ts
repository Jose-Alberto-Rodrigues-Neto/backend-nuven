import { RequestUser } from "../middlewares/auth.js";
import UserService from "../services/UserService.js";
import { Request, Response } from "express";

export default class UserController {
    constructor(private userService: UserService){}
    async login(req:Request, res:Response){
        try{
            const {email, senha} = req.body
            const user = await this.userService.getUser(email, senha)
            res.status(200).json({
                user
            })
        }catch(error){
            const message = error instanceof Error ? error.message : 'Erro desconhecido ao tentar fazer login!';
            res.status(400).json({
                error: "Erro ao tentar fazer login: \n" + message
            })
        }
    }
    async register(req: Request, res: Response){
        try{
            const {nome, email, senha} = req.body
            const user = await this.userService.createUser(nome, email, senha)
            res.status(201).json({
                user
            })
        }catch(error){
            const message = error instanceof Error ? error.message : 'Erro desconhecido ao criar usuário';
            res.status(400).json({
                error: message
            })
        }
    }

    async getAllUsers(req: Request, res: Response){
        try{
            const users = await this.userService.listAll()
            res.status(200).json(users)
        }catch(error){
            res.status(500).json({
                error: "Erro: " + error + "\nAo buscar usuários!"
            })
        }
    }

    async getMe(req:Request, res: Response){
        const reqUser = req as RequestUser
        const userId = reqUser.user?.id
        const userData = this.userService.getProfile(userId)
        res.status(200).json({
            userData
        })
    }

    async updateUser(req: Request, res: Response){
        const {nome, email, senha} = req.body;
    }

    async getUser(req: Request, res: Response){
        const email = req.body

    }
}