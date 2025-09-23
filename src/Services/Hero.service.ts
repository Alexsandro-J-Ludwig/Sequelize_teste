import Herois from "../modals/heros.modal";
import { HeroDTO, HeroResponseDTO } from "../DTOs/HeroDTO";

class HeroService {
    static async createHero(dto: HeroDTO): Promise<HeroResponseDTO> {
        //Faz a validação se heroi existe ou não
        const heroiExistValidator = await Herois.findOne({ where: { nome: dto.nome } });
        if (heroiExistValidator) throw new Error("Heroi já existe");

        //Faz a criação do heroi e para o usuário;
        const dataParaCriacao: any = {};

        if(dto.nome !== undefined) dataParaCriacao.nome = dto.nome;
        if(dto.poder !== undefined) dataParaCriacao.poder = dto.poder;
        dataParaCriacao.vitorias = 0;
        dataParaCriacao.derrotas = 0;

        const data = await Herois.create(dataParaCriacao);

        return HeroService.responseModel(data)
    }

    //Retorna todos os herois
    static async getAllHeros() {
        const data = await Herois.findAll();
        return data.map(heroi => HeroService.responseModel(heroi))
    }

    //Retorna apenas um heroi pelo seu nome
    static async getHero(dto: HeroDTO) {
        const data = await Herois.findOne({ where: {nome: dto.nome}});
        if(!data) throw new Error("Nenhum heroi encontrado")

        return HeroService.responseModel(data)
    }

    //Atualiza heroi pelo seu nome;
    static async updateHero(id: number, dto: HeroDTO){
        const dataParaCriacao: any = {};

        if(dto.nome !== undefined) dataParaCriacao.nome = dto.nome;
        if(dto.poder !== undefined) dataParaCriacao.poder = dto.poder;
        if(dto.vitorias !== undefined) dataParaCriacao.vitorias = dto.vitorias;
        if(dto.derrotas !== undefined) dataParaCriacao.derrotas = dto.derrotas;

        const data = await Herois.update(dataParaCriacao, {where: {id:id}})
        if(!data) throw new Error("Heroi não encontrado ou nenhum campo atualizado")
    }

    //Deleta heroi pelo seu ID
    static async deleteHero(id:number){
        const deleteCount = await Herois.destroy({ where:{id:id}});
        if(deleteCount === 0) throw new Error("Heroi não encontrado")
    }

    //Método auxiliar para diminuir repetição de código
    static responseModel(data:any){
        return new HeroResponseDTO(
            data.id,
            data.nome,  
            data.poder,
            data.vitorias,
            data.derrotas,
            "Retorno"
        )
    }
}

export { HeroService }