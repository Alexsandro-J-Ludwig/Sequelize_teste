/**
 * DTO para envio de dados ao service e retorno de dados para o controller
 */

class BattleDTO {
  constructor(
    public readonly id_heroi: number,
    public readonly id_vilao: number,
  ) {
    if (!id_heroi || !id_vilao)
      throw new Error("Campos não devem estar vazios");
  }

  static fromRequest(body: any): BattleDTO {
    return new BattleDTO(body.nome_heroi, body.nome_vilao);
  }
}

class BattleResponseDTO {
  constructor(
    public readonly id: number,
    public readonly nome_vencedor: string,
    public readonly nome_perdedor: string
  ) {}
}

export { BattleDTO, BattleResponseDTO };
