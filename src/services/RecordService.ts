import RecordRepository from "../repositories/RecordRepository.js";

export default class RecordService{
    constructor(private recordRepository: RecordRepository){}

    async searchQuery(query: string, user_id: string){
        const records = await this.recordRepository.searchRecords(query, user_id)
        return records
    }
}