import prisma from "../prisma-client.js";

export default class DatasetRepository{
    async createDataset(
        usuario_id: string,
        nome: string,
        link: string,
        tamanho: number
    ){
        const user = await prisma.user.findUnique({
            where:{
                id: usuario_id
            }
        })
        
        if(!user){
            throw new Error("Usuário não existe!")
            return
        }

        return await prisma.dataset.create(
            {
                data: {
                    nome,
                    link,
                    tamanho,
                    usuario:{
                        connect: {id: usuario_id}
                    }
                },
                include:{
                    usuario: true,
                    records: true
                }
            }
        )
    }

    async createRecords(datasetId: string, records: any[]) {
        const recordData = records.map((r) => ({
            dataset_id: datasetId,
            dados_json: r,
        }));

        return await prisma.record.createMany({
            data: recordData,
        });
    }

    async updateDataset(
        id: string,
        nome: string
    ){
        return await prisma.dataset.update(
            {
                where: {id},
                data:{
                    nome: nome
                }
            }
        )
    }

    async deleteDataset(
        id: string
    ){
        return await prisma.dataset.delete({where: {id}})
    }

    async listAllRecordsByDataset(id: string){
        const dataset = await prisma.dataset.findUnique(
            {
                where:{
                    id
                },
                include: {
                    records: true
                }
            }
        )

        if(!dataset.records){
            throw new Error("Records is empty!")
            return
        }

        return dataset.records
    }

    async listAllUsersDatasets(user_id: string){
        return await prisma.dataset.findMany(
            {
                where:{
                    usuario_id: user_id
                }
            }
        )
    }
}