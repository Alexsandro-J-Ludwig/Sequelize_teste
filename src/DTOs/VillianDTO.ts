class VillianDTO {
    private nome:string;
    private poder:number;
    private vitorias:number;
    private derrotas:number;

    constructor(nome:string, poder:number, vitorias:number, derrotas:number){
        this.nome = nome;
        this.poder = poder;
        this.vitorias = vitorias;
        this.derrotas = derrotas;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getPoder(): number {
        return this.poder;
    }

    public setPoder(poder: number): void {
        this.poder = poder;
    }

    public getVitorias(): number {
        return this.vitorias;
    }

    public setVitorias(vitorias: number): void {
        this.vitorias = vitorias;
    }

    public getDerrotas(): number {
        return this.derrotas;
    }

    public setDerrotas(derrotas: number): void {
        this.derrotas = derrotas;
    }
}

export default VillianDTO