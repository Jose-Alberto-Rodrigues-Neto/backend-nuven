import prisma from "../prisma-client.js";

export default class DatasetRepository{
    async createDataset(
        usuario_id: string,
        nome: string,
        link: string
    ){
        return await prisma.dataset.create(
            {
                data: {
                    nome,
                    link,
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