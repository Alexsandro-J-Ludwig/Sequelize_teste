import { Herois } from "../modals/heros.modal.ts";
import { HeroDTO, HeroUpdateDTO } from "../DTOs/HeroDTO.ts";
import { HeroService } from "../Services/Hero.service.ts";
import { Request, Response } from "express";

//Controlador de heroi
class HeroController {
  //======================================================
  // Controller para criar heroi
  //======================================================
  static async createHero(req: Request, res: Response) {
    try {
      //Define os elementos vindo do usuario no DTO e retorna um DTO com as informacoes necessarios
      const heroiDTO = HeroDTO.fromRequest(req.body);

      const response = await HeroService.createHero(heroiDTO);

      if (!response) {
        return res.status(400).send({ msg: "Falha ao criar heroi" });
      }

      res.status(201).send({ msg: "Heroi cadastrado", data: response });
    } catch (err: any) {
      if (err.message === "Heroi já existe")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Campos não podem estar vazios")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Poder não pode ser negativo")
        return res.status(400).send({ msg: err.message });
    }
  }

  //======================================================
  // Pega todos os herois
  //======================================================
  static async getAllHeros(_: Request, res: Response) {
    try {
      const response = await Herois.findAll();

      res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      if (err.message === "Nenhum heroi encontrado")
        return res.status(404).send({ msg: err.message });
    }
  }

  //======================================================
  // Pega um heroi com base em seu nome
  //======================================================
  static async getHero(req: Request, res: Response) {
    try {
      const response = await Herois.findOne({ where: { nome: req.body.nome } });

      res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      if (err.message === "Nenhum heroi encontrado")
        return res.status(404).send({ msg: err.message });
    }
  }

  //======================================================
  // Atualiza o Heroi com base no DTO informado
  //======================================================
  static async updateHero(req: Request, res: Response) {
    try {
      const response = HeroUpdateDTO.fromRequest(req.body);

      return res.status(200).send({ msg: "Herói atualizado com sucesso" });
    } catch (err: any) {
      if (err.message === "Nenhum heroi informado")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Nome é obrigatório")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Nome deve ter pelo menos 2 caracteres")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Poder não pode ser negativo")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Vitórias não podem ser negativas")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Derrotas não podem ser negativas")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Heroi não encontrado ou nenhum campo atualizado")
        return res.status(400);
    }
  }

  //======================================================
  // Deleta heroi com base no ID
  //======================================================
  static async deleteHero(req: Request, res: Response) {
    try {
      const response = await HeroService.deleteHero(
        req.query.id as unknown as number
      );

      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      if (err.message === "Nenhum heroi encontrado")
        return res.status(404).send({ msg: err.message });
    }
  }
}

export default HeroController;
