//DTO de envio de requisição de Vilão
class VillianDTO {
    constructor(
        public readonly nome?:string, 
        public readonly poder?:number, 
        public readonly vitorias?:number,
        public readonly derrotas?:number
    ){
        if(nome !== undefined){
            if (!nome || nome.trim().length === 0) {
                throw new Error("Nome é obrigatório");
            }
            if (nome.trim().length < 2) {
                throw new Error("Nome deve ter pelo menos 2 caracteres");
            }
            if (nome.trim().length > 50) {
                throw new Error("Nome não pode ter mais de 50 caracteres");
            }

        }
        if(poder !== undefined){
            if (poder < 0) {
                throw new Error("Poder não pode ser negativo");
            }
            if (poder > 100) {
                throw new Error("Poder não pode ser maior que 100");
            }
        }

         if(vitorias !== undefined){
            if (vitorias < 0) {
                throw new Error("Vitórias não podem ser negativas");
            }
        }

        if(derrotas !== undefined){
            if (derrotas < 0) {
                throw new Error("Derrotas não podem ser negativas");
            }
        }
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
        public readonly response: string
    ){
        if(!id && !nome && !poder && !vitorias && !derrotas) throw new Error("Não foi possível retornar Vilão")
    }
}

export {VillianDTO, VillianResponseDTO};