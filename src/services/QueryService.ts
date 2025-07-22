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

        const registrosFormatados = dataset.records.slice(0, 5)
                                                    .map((r, i) => `Registro ${i + 1}: ${JSON.stringify(r.dados_json)}`)
                                                    .join("\n")

        const prompt = `Procure informações referentes a: ${pergunta} e me responda utilizando os dados do meu arquivo escolhido. Dados: {nome: ${dataset.nome}, tamanho do arquivo: ${dataset.tamanho}, data de criação do arquivo: ${dataset.criado_em}}. dados do arquivo: ${registrosFormatados}`
        
        const resposta = await this.geminiService.gerarRespostaGemini(prompt)

        if(!resposta){
            throw new Error("Erro ao acessar o Gemini!")
            return
        }

        const query = await this.queryRepository.createQuery(pergunta, resposta, user_id)

        return{
            query
        }

    }

    async getQueryHistory(user_id: string){
        return await this.queryRepository.listQueryHistory(user_id)
    }
}