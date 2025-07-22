import { Request, Response } from "express";
import { RequestUser } from "../middlewares/auth.js";
import QueryService from "../services/QueryService.js";

export default class QueryController{
    constructor(private queryService: QueryService){}

    async createQuery(req: Request, res: Response){
        try{
            const reqUser = req as RequestUser
            const user_id = reqUser.user?.id
            const {pergunta, dataset_id} = req.body
            const query = await this.queryService.createQuery(pergunta, dataset_id, user_id)
            res.status(201).json({
                query
            })
        }catch(error){
            res.status(500).json({
                error: "Erro ao criar pergunta: " + error
            })
        }
    }

    async getHistory(req: Request, res: Response){
        try{
            const reqUser = req as RequestUser
            const user_id = reqUser.user?.id
            const history = await this.queryService.getQueryHistory(user_id)
            res.status(200).json({
                history
            })
        }catch(error){
            res.status(500).json({
                error: "Erro ao buscar histórico de perguntas: " + error
            })
        }
    }
}