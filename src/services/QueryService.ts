import QueryRepository from "../repositories/QueryRepository.js";
import GeminiService from "./GeminiService.js";

export default class QueryService{
    constructor(
        private queryRepository: QueryRepository, 
        private geminiService: GeminiService
    ){}

    async createQuery(
        pergunta: string,
        dataset_id: string,
        user_id: string
    ){
        const dataset = await this.queryRepository.getDataset(dataset_id)

        if(!dataset){
            throw new Error("Dataset não foi encontrado!")
            return
        }

        const prompt = `Procure informações referentes a: ${pergunta} e me responda utilizando os dados do meu arquivo escolhido. Dados: {nome: ${dataset.nome}, tamanho do arquivo: ${dataset.tamanho}, data de criação do arquivo: ${dataset.criado_em}}. dados do arquivo: ${dataset.records[0]} ${dataset.records[1]} ${dataset.records[2]} ${dataset.records[3]} ${dataset.records[4]}`
        
        const resposta = await this.geminiService.gerarRespostaGemini(prompt)

        if(!resposta){
            throw new Error("Erro ao acessar o Gemini!")
            return
        }

        return{
            pergunta,
            resposta,
            user_id
        }

    }

    async getQueryHistory(user_id: string){
        return await this.queryRepository.listQueryHistory(user_id)
    }
}