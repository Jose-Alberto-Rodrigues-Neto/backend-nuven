import UserService from "../services/UserService.js";
import { Request, Response } from "express";

export default class UserController {
    constructor(private userService: UserService){}

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

    async updateUser(req: Request, res: Response){
        const {nome, email, senha} = req.body;
    }

    async getUser(req: Request, res: Response){
        const email = req.body

    }
}