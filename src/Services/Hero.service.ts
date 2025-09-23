import Herois from "../modals/heros.modal";
import { HeroDTO, HeroResponseDTO, HeroUpdateDTO } from "../DTOs/HeroDTO";

class HeroService {
  static async createHero(dto: HeroDTO): Promise<HeroResponseDTO> {
    //Faz a validação se heroi existe ou não
    const heroiExistValidator = await Herois.findOne({
      where: { nome: dto.nome },
    });

    if (heroiExistValidator) throw new Error("Heroi já existe");

    //Faz a criação do heroi usando o DTO como base
    const data = await Herois.create(dto);

    return HeroService.responseModel(data);
  }

  //Retorna todos os herois
  static async getAllHeros() {
    const data = await Herois.findAll();
    return data.map((heroi) => HeroService.responseModel(heroi));
  }

  //Retorna apenas um heroi pelo seu nome
  static async getHero(nome: string) {
    const data = await Herois.findOne({ where: { nome: nome } });
    if (!data) throw new Error("Nenhum heroi encontrado");

    return HeroService.responseModel(data);
  }

  //Atualiza heroi pelo seu nome;
  static async updateHero(dto: HeroUpdateDTO) {
    const [data] = await Herois.update(dto, {
      where: { nome: dto.nomeHeroiConsulta },
    });
    if (data === 0)
      throw new Error("Heroi não encontrado ou nenhum campo atualizado");
  }

  //Deleta heroi pelo seu ID
  static async deleteHero(id: number) {
    const data = await Herois.findOne({ where: { id: id } });
        if(!data) throw new Error("Nenhum heroi encontrado");
        
        await Herois.destroy({ where: { id: id } });
  }

  //Método auxiliar para diminuir repetição de código
  static responseModel(data: Herois) {
    return new HeroResponseDTO(
      data.id,
      data.nome,
      data.poder,
      data.vitorias,
      data.derrotas
    );
  }
}

export { HeroService };
