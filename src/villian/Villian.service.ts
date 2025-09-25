import Vilians from "./villians.modal";
import {
  VillianDTO,
  VillianResponseDTO,
  VillianUpdateDTO,
} from "./VillianDTO";

class VillianService {
  //=============================================================================
  // Cria um vilao
  //=============================================================================
  static async createVillian(dto: VillianDTO): Promise<VillianResponseDTO> {
    //Valida se existe um heroi, se existir, retorna um erro
    const villianValidatorExist = await Vilians.findOne({
      where: { nome: dto.nome },
    });

    if (villianValidatorExist) throw new Error("Vilão já existe");

    //Realiza a criação de vilão e retorna os dados ao usuário;
    const data = await Vilians.create(dto);
    return VillianService.responseModel(data);
  }

  //=============================================================================
  // Pega todos os vilões
  //=============================================================================
  static async getAllVillians() {
    const data = await Vilians.findAll();
    if (!data) throw new Error("Nenhum vilão encontrado");

    return data.map((heroi) => VillianService.responseModel(heroi));
  }

  //=============================================================================
  // Pega apenas um vilão de acordo com o nome
  //=============================================================================
  static async getVillain(nome: string) {
    const data = await Vilians.findOne({ where: { nome: nome } });
    if (!data) throw new Error("Nenhum vilão encontrado");

    return VillianService.responseModel(data);
  }

  //=============================================================================
  // Atualiza os campos de vilão com o nome informado
  //=============================================================================

  static async updateVillain(dto: VillianUpdateDTO) {
    const [data] = await Vilians.update(dto, {
      where: { nome: dto.nomeVilaoConsulta },
    });
    if (data === 0)
      throw new Error("Heroi não encontrado ou nenhum campo atualizado");
  }

  //=============================================================================
  // Deleta um vilao com o id informado
  //=============================================================================
  static async deleteVillain(id: number) {
    const data = await Vilians.findOne({ where: { id: id } });
      if (!data) throw new Error("Nenhum vilão encontrado");

    await Vilians.destroy({ where: { id: id } });
  }

  //=============================================================================
  // Metodo auxiliar para diminuir a repeticao de codigo
  ////=============================================================================
  static responseModel(data: Vilians) {
    return new VillianResponseDTO(
      data.id,
      data.nome,
      data.poder,
      data.vitorias,
      data.derrotas
    );
  }
}

export { VillianService };
