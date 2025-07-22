import prisma from "../prisma-client.js";

export default class QueryRepository{
    async createQuery(
        pergunta: string,
        resposta: string, 
        user_id: string
    ){
        return await prisma.query.create({
            data:{
                usuario_id: user_id,
                pergunta: pergunta,
                resposta: resposta 
            }
        })
    }

    async listQueryHistory(user_id: string){
        return await prisma.query.findMany({
            where:{
                usuario_id: user_id
            }
        })
    }
}