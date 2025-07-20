import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';

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
        return this.userRepository.createUser(
            nome,
            email,
            encryptedPassword
        )
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

}