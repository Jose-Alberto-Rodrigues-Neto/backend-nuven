import DatasetRepository from "../repositories/DatasetRepository.js";

export default class DatasetService{
    constructor(private datasetRepository: DatasetRepository){}

    async registerDataset(
        nome: string,
        usuario_id: string,
        link: string
    ){
        const dataset =  await this.datasetRepository.createDataset(
            nome,
            usuario_id,
            link
        )

        return{
            nome: dataset.nome,
            criado_em: dataset.criado_em,
            link: dataset.nome,
            records: dataset.records
        }
    }

    async listAllDatasetRecords(id: string){
        return await this.datasetRepository.listAllRecordsByDataset(id)
    }

    async listAllUsersDatasets(user_id: string){
        return this.datasetRepository.listAllUsersDatasets(user_id)
    }
}