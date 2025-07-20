import { Request, Response } from "express";
import DatasetService from "../services/DatasetService.js";
import { RequestUser } from "../middlewares/auth.js";

export default class DatasetController{
    constructor(private datasetService: DatasetService){}
    async createDataset(req: Request, res: Response){
        try{
            const {nome, user_id} = req.body
            const file = req.file
            if(!file){
                res.status(400).json({error: 'Nenhum arquivo enviado!'})
                return
            }
            
            const dataset = await this.datasetService.registerDataset(nome, user_id, file.path)

            res.status(201).json({
                dataset
            })

            res.json
        }catch(error){
            res.status(500).json({error: 'Erro interno ao criar dataset!\n' + error})
        }
    }

    async listAllRecordsByDatasetId(req: Request, res: Response){
        try{
            const {id} = req.params
            const records = this.datasetService.listAllDatasetRecords(id)
            res.status(200).json({
                records
            })
        }catch(error){
            res.status(500).json({error: "Erro ao tentar encontrar registros do dataset!\n" + error})
        }
    }

    async listAllUsersDatasets(req: Request, res: Response){
        try{
            const reqUser = req as RequestUser
            const userId = reqUser.user?.id
            const datasets = await this.datasetService.listAllUsersDatasets(userId)
            res.status(200).json({
                datasets
            })
        }catch(error){
            res.status(500).json({error: "Erro ao tentar encontrar lista de dataset do usuário!\n" + error})
        }
    }
}