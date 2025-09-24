import Battles from "../modals/Battle.modal";
import { BattleDTO, BattleResponseDTO } from "../DTOs/BattleDTO";
import Herois from "../modals/heros.modal";
import Vilians from "../modals/villians.modal";

class BattleService {
  //============================================================================
  // Metodo para batalahs os herois
  //============================================================================
  static async battle(dto: BattleDTO) {
    const heroi = await Herois.findOne({ where: { id: dto.id_heroi } });
    if (!heroi) throw new Error("Heroi não encontrado");

    const vilao = await Vilians.findOne({ where: { id: dto.id_vilao } });
    if (!vilao) throw new Error("Vilão não encontrado");

    let nome_vencedor: string = "";
    let nome_perdedor: string = "";

    if (heroi.poder > vilao.poder) {
      nome_vencedor = heroi.nome;
      nome_perdedor = vilao.nome;
    } else if (vilao.poder > heroi.poder) {
      nome_vencedor = vilao.nome;
      nome_perdedor = heroi.nome;
    } else {
      nome_vencedor = "Empate";
      nome_perdedor = "Empate";
    }

    const data = await Battles.create({
      id_heroi: dto.id_heroi,
      id_vilao: dto.id_vilao,
      nome_vencedor,
      nome_perdedor,
    });
    return BattleService.responseModel(data);
  }

  //============================================================================
  // Pega todas as batalahs e envia ao response DTO
  //============================================================================
  static async getAllBattles() {
    const data = await Battles.findAll();
    return data.map(battle => BattleService.responseModel(battle));
  }

  //============================================================================
  // Pega batalha pelo ID
  //============================================================================
  static async getBattle(id: number) {
    const data = await Battles.findOne({ where: { id: id } });
    if (!data) throw new Error("Nenhuma batalha encontrada");

    return BattleService.responseModel(data);
  }

  //============================================================================
  // Deleta batalha a partir do ID de controller
  //============================================================================
  static async deleteBattle(id: number) {
    const data = await Battles.findOne({ where: { id: id } });
    if (!data) throw new Error("Nenhuma batalha encontrada");

    await Battles.destroy({ where: { id: id } });
  }

  //=============================================================================
  // Metodo auxiliar para diminuir a repeticao de codigo
  //=============================================================================
  static responseModel(data: Battles) {
    return new BattleResponseDTO(
      data.id!,
      data.nome_vencedor,
      data.nome_perdedor
    );
  }
}

export { BattleService };