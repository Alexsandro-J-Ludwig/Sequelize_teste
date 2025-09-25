class HeroDTO {
  constructor(
    public readonly nome: string,
    public readonly poder: number,
    public readonly vitorias?: number,
    public readonly derrotas?: number
  ) {
    if (!nome || !poder) throw new Error("Campos não podem estar vazios");
    if (poder < 0) throw new Error("Poder não pode ser negativo");
  }

  static fromRequest(body: any): HeroDTO {
    return new HeroDTO(body.nome, body.poder);
  }
}

class HeroUpdateDTO {
  constructor(
    public readonly nomeHeroiConsulta: string,
    public readonly nome?: string,
    public readonly poder?: number,
    public readonly vitorias?: number,
    public readonly derrotas?: number
  ) {
    //Valida se o nome informado para a consulta foi informado
    if (!nomeHeroiConsulta) throw new Error("Nenhum heroi informado");

    //Caso o nome seja informado, será aplicado a validação de nome
    if (nome !== undefined) {
      if (!nome || nome.trim().length === 0) {
        throw new Error("Nome é obrigatório");
      }
      if (nome.trim().length < 2) {
        throw new Error("Nome deve ter pelo menos 2 caracteres");
      }
    }

    //Caso o poder seja informado
    if (poder !== undefined) {
      if (poder < 0) {
        throw new Error("Poder não pode ser negativo");
      }
    }

    //Caso as vitórias sejam informadas
    if (vitorias !== undefined) {
      if (vitorias < 0) {
        throw new Error("Vitórias não podem ser negativas");
      }
    }

    //Caso as derrotas sejam informadas
    if (derrotas !== undefined) {
      if (derrotas < 0) {
        throw new Error("Derrotas não podem ser negativas");
      }
    }
  }

  static fromRequest(body: any): HeroUpdateDTO {
    return new HeroUpdateDTO(
      body.nomeHeroiConsulta,
      body.nome,
      body.poder,
      body.vitorias,
      body.derrotas
    );
  }
}

//DTO de resposta da requisicao
class HeroResponseDTO {
  constructor(
    public readonly id: number,
    public readonly nome: string,
    public readonly poder: number,
    public readonly vitorias: number,
    public readonly derrotas: number
  ) {}
}

export { HeroDTO, HeroUpdateDTO, HeroResponseDTO };
