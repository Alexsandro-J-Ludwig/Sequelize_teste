/**
 * DTO para envio de dados ao service e retorno de dados para o controller
 */

class BattleDTO {
    constructor(
        public readonly id_hero:number, 
        public readonly id_vilian:number, 
    ){
        if(!id_hero || !id_vilian) throw new Error("Campos não devem estar vazios")
    }
}

class WinnerDTO {
    constructor(
        public readonly nome_vencedor:string,
        public readonly nome_perdedor:string
    ){
        if(!nome_perdedor || !nome_vencedor) throw new Error("Campos não podem estar vazios");
    }
}

export {
    BattleDTO, 
    WinnerDTO
};