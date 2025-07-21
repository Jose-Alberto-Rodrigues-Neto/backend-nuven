import prisma from "../prisma-client.js";

export default class RecordRepository{
    async searchRecords(query: string, user_id: string){
        const searchQuery = `%${query.toLowerCase()}%`

        const queryResponse = await prisma.$queryRaw`
            SELECT r.id, r.dados_json, r.criado_em
            FROM "Record" r
            JOIN "Dataset" d ON d.id = r.dataset_id
            WHERE LOWER(r.dados_json::text) LIKE ${searchQuery}
            AND d.usuario_id = ${user_id}
        `      
        return queryResponse
    }
}