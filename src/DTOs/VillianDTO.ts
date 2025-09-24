//==================================================================
// Construtor do DTO para criar vilão
//==================================================================
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

  // Recebe o corpo de requisição de controller
  static fromRequest(body: any): VillianDTO {
    return new VillianDTO(body.nome, body.poder);
  }
}

//==================================================================
// Construtor do DTO para os dados de atualizacao de Vilão
//==================================================================
class VillianUpdateDTO {
  constructor(
    public readonly nomeVilaoConsulta: string,
    public readonly nome?: string,
    public readonly poder?: number,
    public readonly vitorias?: number,
    public readonly derrotas?: number
  ) {
    // Valida o unico campo obrigatorio
    if (!nomeVilaoConsulta) throw new Error("Nenhum vilão informado");

    // Faz a validacao de campos informados
    //============================================================
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
    //=============================================================
  }

  // Recebe o body de controller e o mapeia no DTO
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

//==================================================================
// Construtor do DTO par manipular os dados de retorna da requisicao
//==================================================================
class VillianResponseDTO {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly poder: number,
    public readonly vitorias: number,
    public readonly derrotas: number
  ) {}
}

export { VillianDTO, VillianUpdateDTO, VillianResponseDTO };
