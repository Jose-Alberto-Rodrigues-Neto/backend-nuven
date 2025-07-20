import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/auth.js';

const SALT_ROUNDS = 12

export default class UserService{
    constructor(private userRepository: UserRepository){}

    async listAll(){
        return await this.userRepository.listAllUsers()
    }

    async createUser(
        nome: string,
        email: string,
        senha: string
    ){
        const encryptedPassword = await bcrypt.hash(senha, SALT_ROUNDS)

        const user = await this.userRepository.createUser(
            nome,
            email,
            encryptedPassword
        )

        const token = await generateToken({userId: user.id})
        
        return {
            user:{
                id: user.id,
                nome: user.nome,
                email: user.email
            },
            token
        }
    }

    async getUser(
        email: string,
        senha: string
    ){
        const user = await this.userRepository.searchEmail(email)
        if(!user){
            throw new Error("Email incorreto!")
            return
        }
        const isEqual = await bcrypt.compare(senha, user.senha_hash)
        if(!isEqual){
            throw new Error("Senha incorreta!")
            return 
        }

        const token = generateToken({userId: user.id})

        return {
            user:{
                id: user.id,
                nome: user.nome,
                email: user.email
            },
            token
        }
    }
    
    async updateUser(
        nome: string,
        email: string,
        senha: string
    ){
        if(senha !== null && email !== null && nome !== null){
            const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)
            return this.userRepository.updateUser(
                email,
                nome,
                senhaHash
            )
        }
        throw new Error("Um dos campos {nome, email, senha} está vazio!")
        return
    }

    async getProfile(userId: string){
        return await this.userRepository.searchId(userId)
    }

    async getId(userId: string){
        const user = await this.userRepository.searchId(userId)
        if(!user){
            throw new Error("Usuário não encontrado!")
            return
        }
        return user.id
    }

}