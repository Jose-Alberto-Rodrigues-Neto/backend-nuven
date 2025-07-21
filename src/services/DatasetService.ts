import DatasetRepository from "../repositories/DatasetRepository.js";
import Papa from 'papaparse';
import fs from 'fs/promises';

export default class DatasetService{
    constructor(private datasetRepository: DatasetRepository){}

    async registerDataset(
    nome: string,
    usuario_id: string,
    link: string,
    tamanho: number
  ) {
    const dataset = await this.datasetRepository.createDataset(usuario_id, nome, link, tamanho);

    const csvContent = await fs.readFile(link, 'utf-8');

    const parsed = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true
    });

    if (parsed.errors.length > 0) {
      throw new Error(`Erro ao processar CSV: ${parsed.errors.map(e => e.message).join(', ')}`);
    }

    const records = parsed.data as Record<string, any>[];
    
    await this.datasetRepository.createRecords(dataset.id, records);

    return {
      nome: dataset.nome,
      tamanho: dataset.tamanho,
      criado_em: dataset.criado_em,
      link: dataset.link,
      records: records
    };
  }

    async listAllDatasetRecords(id: string){
        return await this.datasetRepository.listAllRecordsByDataset(id)
    }

    async listAllUsersDatasets(user_id: string){
        return this.datasetRepository.listAllUsersDatasets(user_id)
    }
}