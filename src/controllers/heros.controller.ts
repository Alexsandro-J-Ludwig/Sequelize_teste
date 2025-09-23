import { Herois } from "../modals/heros.modal.ts"
import { HeroDTO, HeroUpdateDTO } from "../DTOs/HeroDTO.ts";
import { HeroService } from "../Services/Hero.service.ts";
import { Request, Response } from "express";

//Controlador de heroi
class HeroController{
    //Controller para criar Heroi
    static async createHero(req: Request, res: Response){
        try {
            //Define os elementos vindo do usuario no DTO e retorna um DTO com as informacoes necessarios
            const heroiDTO = HeroDTO.fromRequest(req.body);

            const response = await HeroService.createHero(heroiDTO)

            if(!response){
                return res.status(400).send({ msg:"Falha ao criar heroi" })
            }

            res.status(201).send({ msg:"Heroi cadastrado", data: response});
        } catch (error) {
            res.status(500).send({msg:`Erro ao cadastrar Heroi: ${error}`});
        }
    }

    static async getAllHeros(_: Request, res: Response){
        try{
            const response = await Herois.findAll();

            if(!response){
                return res.status(404).send({ msg:"Nenhum heroi encontrado" })
            }

            res.status(200).send({ success: true, data: response})
        } catch(err){
            res.status(500).send({ Success: false, error: `Erro ao buscar heroi: ${err}`});
        }
    }

    static async getHero(req: Request, res: Response){
        try{
            const response = await Herois.findOne({ where: {nome: req.body.nome} });

            res.status(200).send({ success: true, data: response});
        } catch(err){
            res.status(500).send({ Success: false, error: `Erro ao buscar heroi: ${err}`});
        }
    }

    //Atualiza o Heroi com base no DTO informado
    static async updateHero(req: Request, res: Response){
        try {
            const response = HeroUpdateDTO.fromRequest(req.body);

            if(!response){
                return res.status(400).send({ msg:"Nenhum heroi informado" })
            }

            return res.status(200).send({ msg: "Herói atualizado com sucesso" });
        } catch (error) {
          return res.status(500).send({ msg: "Erro no servidor", error });
        }
    }

    static async deleteHero(req: Request, res: Response){
        try {
            const response = await HeroService.deleteHero(req.query.id as unknown as number);
            res.status(200).send({ success: true });
        } catch (err) {
            res.status(500).send({ success: false, error: `Erro ao excluir heroi: ${err}`})
        }
    }
}

export default HeroController;