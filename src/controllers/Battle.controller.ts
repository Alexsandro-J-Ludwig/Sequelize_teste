import Herois from "../modals/heros.modal";
import Vilians from "../modals/villians.modal";
import Battles from "../modals/Battle.modal";

export class BattleController {
    static async battle(req, res) {
        try {
            const { heroi, vilao, nome_vencedor } = req.body;

            if(!heroi || !vilao || !nome_vencedor){
                return res.status(400).send({ msg:"heroi, vilao e nome_vencedor não pode estar vizios" });
            };

            const heroiInfo = await Herois.findOne({ where: {nome: heroi}})
            const id_heroi = heroiInfo?.id

            const vilaoInfo = await Vilians.findOne({ where: {nome: vilao}});
            const id_vilao = vilaoInfo?.id

            if(!id_heroi || !id_vilao){
                return res.status(404).send({ msg:"Heroi ou vilão não encontrados" })
            }

            const response = await Battles.create({
                id_heroi:id_heroi, id_vilao:id_vilao, nome_vencedor:nome_vencedor
            });

            if(!response){
                return res.status(400).send({ msg:"Não foi possível criar batalha" });
            };

            res.status(201).send({ success:true, data:response });
        } catch (error) {
            res.status(500).send({ success:false, error:`Erro interno: ${error}` });
        };
    }
}