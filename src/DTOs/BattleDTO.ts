/**
 * DTO para envio de dados ao service e retorno de dados para o controller
 */

class BattleDTO {
    private id_hero:number;
    private id_villian:number;
    private nome_vencedor:string;

    constructor(id_hero:number, id_vilian:number, nome_vencedor:string){
        this.id_hero = id_hero;
        this.id_villian = id_vilian;
        this.nome_vencedor = nome_vencedor;
    }

    public getId_hero(): number {
        return this.id_hero;
    }

    public setId_hero(id_hero: number): void {
        this.id_hero = id_hero;
    }

    public getId_villian(): number {
        return this.id_villian;
    }

    public setId_villian(id_villian: number): void {
        this.id_villian = id_villian;
    }

    public getNome_vencedor(): string {
        return this.nome_vencedor;
    }

    public setNome_vencedor(nome_vencedor: string): void {
        this.nome_vencedor = nome_vencedor;
    }
}

export default BattleDTO;