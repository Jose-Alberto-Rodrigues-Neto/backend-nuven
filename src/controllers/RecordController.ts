import { Request, Response } from "express";
import RecordService from "../services/RecordService.js";
import { RequestUser } from "../middlewares/auth.js";

export default class RecordController{
    constructor(private recordService: RecordService){}

    async queryRecords(req: Request, res: Response){
        try{
            const reqUser = req as RequestUser
            const user_id = reqUser.user?.id
            
            if(!user_id){
                throw new Error("Token inválido ou expirado!")
                return
            }
            
            const query = req.query.query as string
            
            if(!query){
                throw new Error("Nenhuma query foi efetuada!")
                return
            }
            
            const records = await this.recordService.searchQuery(query, user_id)
            
            res.status(200).json({
                records
            })
            
        }catch(error){
            res.status(500).json({
                error: "Erro ao efetuar query!\n" + error
            })
        }
        

    }
}