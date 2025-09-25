import { SheildResponseDTO, ShieldDTO } from "./Shield.dto";
import Agentes from "./Shield.model";

class ShieldService {
    static async create(dto: ShieldDTO){
        const exist = await this.auxFunction(dto.nome);
        if(exist)
            throw new Error("Agente já existe")

        const data = await Agentes.create(dto)
        return new SheildResponseDTO(data.id!, data.nome)
    }

    static async get(dto: ShieldDTO){
        const exist = await this.auxFunction(dto.nome)
        if(!exist)
            throw new Error("Agente não existe");

        if(dto.senha !== exist.senha)
            throw new Error("Senha incorreta");

        return new SheildResponseDTO(exist.id!, exist.nome)
    }

    static async auxFunction(nome:string){
        const data = await Agentes.findOne({ where: { nome: nome}})
        return data;
    }
}