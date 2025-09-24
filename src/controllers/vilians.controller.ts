import { VillianService } from "../Services/Villian.service.ts";
import { VillianDTO, VillianUpdateDTO } from "../DTOs/VillianDTO.ts";
import { Request, Response } from "express";

// Controlador de vilão
class VillainController {
  //======================================================
  // Controller para criar vilão
  //======================================================
  static async createVillain(req: Request, res: Response) {
    try {
      const response = await VillianDTO.fromRequest(req.body);

      res.status(201).send({ success: true, data: response });
    } catch (err:any) {
      if(err.message === "Vilão já existe") return res.status(400).send({ msg:err.message })
      if(err.message === "Campos não podem estar vazios") return res.status(400).send({ msg:err.message })
      if(err.message === "Poder não pode ser negativo") return res.status(400).send({ msg:err.message})
    }
  }

  //======================================================
  // Pega todos os vilões
  //======================================================
  static async getAllVillians(_: Request, res: Response) {
    try {
      const response = await VillianService.getAllVillians();

      res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      //Captura de erros do service e do DTO caso:
      //Haja campos nulos
      //O vilão já exista
      //E caso o poder seja menor que 0
      if (err.message === "Campos não podem estar vazios")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Vilão já existe")
        return res.status(400).send({ msg: err.message });
      if (err.message === "Poder não pode ser negativo")
        throw new Error(err.message);
    }
  }

  //======================================================
  // Pega um vilão com base em seu nome
  //======================================================
  static async getVillain(req: Request, res: Response) {
    try {
      const response = await VillianService.getVillain(req.query.nome as string);

      res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      if (err.message === "Nenhum vilão encontrado")
        return res.status(404).send({ msg: err.message });
    }
  }

  //======================================================
  // Atualiza o vilão com base no DTO informado
  //======================================================
  static async updateVillain(req: Request, res: Response) {
    try {
      const response = VillianUpdateDTO.fromRequest(req.body);

      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      //Captura os erros em service e DTOs, não há necessidade de explicar
      if (err.message === "Nenhum vilão informado")
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
        return res.status(400).send({ msg: err.message });
    }
  }

  //======================================================
  // Deleta vilão com base no ID
  //======================================================
  static async deleteVillain(req: Request, res: Response) {
    try {

      const response = await VillianService.deleteVillain(req.query.id as unknown as number);

      res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      if (err.message === "Nenhum vilão encontrado")
        return res.status(404).send({ msg: err.message });
    }
  }
}

export default VillainController;
