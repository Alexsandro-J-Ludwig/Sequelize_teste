import { Herois } from "../modals/heros.modal.ts"

class HeroController{
    async createHero(req, res){
        try {
            const {nome, poder, vitorias, derrotas} = req.body;

            if(!nome || !poder){
                return res.status(400).send({ msg:"Nome e poder não podem estar vazios" });
            }

            const heroi = await Herois.create({
                nome:"Venom", poder:458
            })

            res.status(201).send({ msg:"Heroi cadastrado", data: "heroi"});

        } catch (error) {
            res.status(500).send({msg:`Erro ao cadastrar Heroi: ${error}`});
        }
    }
}