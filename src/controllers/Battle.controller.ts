import { BattleService } from "../Services/Battle.service";
import { Request, Response } from "express";
import { BattleDTO } from "../DTOs/BattleDTO";

class BattleController {
    static async battle(req: Request, res: Response) {
        try {
            const response = BattleDTO.fromRequest(req.body);

            return res.status(201).send({ success:true, data:response });
        } catch (err:any) {
            if(err.message === "Campos não devem estar vazios") return res.status(400).send({ msg:err.message });
            if(err.message === "Heroi não encontrado") return res.status(404).send({ msg:err.message });
            if(err.message === "Vilão não encontrado") return res.status(404).send({ msg:err.message })
        };
    }

    static async getAllBattles(req: Request, res: Response) {
        try {
            const response = await BattleService.getAllBattles()

            return res.status(200).send({ success:true, data:response });
        } catch (err:any) {
            if(err.message === "Nenhuma batalha encontrada") return res.status(404).send({ msg:err.message });
        };
    }

    static async getBattle(req: Request, res: Response) {
        try {
            const response = await BattleService.getBattle(req.query.id as unknown as number);

            return res.status(200).send({ success: true, data:response})
        } catch (err:any) {
           if(err.message === "Nenhuma batalha encontrada") return res.status(404).send({ msg:err.message }); 
        }
    }

    static async deleteBattle(req: Request, res: Response){
        try {
            const response = await BattleService.deleteBattle(req.query.id as unknown as number);

            return res.status(200).send({ success:true, data:response });
        } catch (err:any) {
            if(err.message === "Nenhuma batalha encontrada") return res.status(404).send({ msg:err.message });
        }
    }
}

export { BattleController }