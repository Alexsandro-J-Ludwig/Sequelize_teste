class ShieldDTO {
    constructor(
        public readonly nome: string,
        public readonly senha: string
    ) {
        if (!nome || !senha) throw new Error("Campos não podem estar vazios");
    }

    // Recebe o corpo de requisição de controller
    static fromRequest(body: any): ShieldDTO {
        return new ShieldDTO(body.nome, body.senha);
    }
}

class SheildResponseDTO {
    constructor(
        public readonly id:number,
        public readonly nome:string
    ){}
}

export { ShieldDTO, SheildResponseDTO}