//DTO de envio de requisição de Vilão
class VillianDTO {
  constructor(
    public readonly nome: string,
    public readonly poder: number,
    public readonly vitorias?: number,
    public readonly derrotas?: number
  ) {
    if (!nome || !poder) throw new Error("Campos não podem estar vazios");
    if (poder < 0) throw new Error("Poder não pode ser negativo");
  }

  static fromRequest(body: any): VillianDTO {
    return new VillianDTO(body.nome, body.poder);
  }
}

//DTO de atualização de vilão
class VillianUpdateDTO {
  constructor(
    public readonly nomeVilaoConsulta: string,
    public readonly nome?: string,
    public readonly poder?: number,
    public readonly vitorias?: number,
    public readonly derrotas?: number
  ) {
    if (!nomeVilaoConsulta) throw new Error("Nenhum vilão informado");

    if (nome !== undefined) {
      if (!nome || nome.trim().length === 0)
        throw new Error("Nome é obrigatório");
      if (nome.trim().length < 2)
        throw new Error("Nome deve ter pelo menos 2 caracteres");
    }

    if (poder !== undefined) {
      if (poder < 0) throw new Error("Poder não pode ser negativo");
    }

    if (vitorias !== undefined) {
      if (vitorias < 0) throw new Error("Vitórias não podem ser negativas");
    }

    if (derrotas !== undefined) {
      if (derrotas < 0) throw new Error("Derrotas não podem ser negativas");
    }
  }

  static fromRequest(body: any): VillianUpdateDTO {
    return new VillianUpdateDTO(
      body.nomeVilaoConsulta,
      body.nome,
      body.poder,
      body.vitorias,
      body.derrotas
    );
  }
}

//DTO de resposta de vilão
class VillianResponseDTO {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly poder: number,
    public readonly vitorias: number,
    public readonly derrotas: number,
  ) {}
}

export { VillianDTO, VillianUpdateDTO, VillianResponseDTO };
