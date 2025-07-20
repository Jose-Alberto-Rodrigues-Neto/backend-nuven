import prisma from "../prisma-client.js";

export default class UserRepository {
    async createUser(
        nome: string,
        email: string,
        senha_hash: string
    ){
        return await prisma.user.create({
            data:{
                nome, 
                email,
                senha_hash
            }
        });
    }

    async listAllUsers(){
        return await prisma.user.findMany()
    }

    async searchName(nome: string){
        const res = await prisma.user.findMany({
            where: {
                nome: {
                    startsWith: nome
                }
            }
        })
        return res;
    }

    async searchEmail(email: string){
        const res = await prisma.user.findUnique({
            where: {email}
        })
        return res;
    }

    async getUserPassword(email: string){
        const user = await this.searchEmail(email)
        if(!user) return null
        return user.senha_hash
    }

    async updateUser(email: string, nome: string, senha_hash: string){
        return await prisma.user.update({
            where: {
                email: email
            },
            data: {
                nome,
                email,
                senha_hash
            }
        })
    }

    async deleteUser(email: string){
        return await prisma.user.delete({
            where:{
                email
            }
        })
    }
    
}