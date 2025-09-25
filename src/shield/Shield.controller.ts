import { ShieldDTO } from "./Shield.dto.js";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class ShieldController {
    static async createAgent(req: Request, res: Response) {
        try {
            const response = await ShieldDTO.fromRequest(req.body)
            const token = jwt.sign({nome: response.nome}, process.env.SJWT || 'fallback-secret', {expiresIn: 3600})

            return res.status(201).send({ success: true, data: {token:token} })
        } catch (err: any) {
            if (err.message === "Agente já existe") 
                return res.status(400).send({ msg: err.message });
            if (err.message === "Campos não podem estar vazios") 
                return res.status(400).send({ msg: err.message });
        }
    }

    static async getAgent(req: Request, res: Response) {
        try {
            const response = await ShieldDTO.fromRequest(req.body)
            const token = jwt.sign({nome: response.nome}, process.env.SJWT || 'fallback-secret', {expiresIn: 3600})

            return res.status(201).send({ success: true, data: {token:token} })
        } catch (err: any) {
            if (err.message === "Campos não podem estar vazios") 
                return res.status(400).send({ msg: err.message });
            if (err.message === "Agente não encontrado") 
                return res.status(404).send({ msg: err.message });
            if (err.message === "Senha incorreta") 
                return res.status(400).send(401).send({ msg: err.message })
        }
    }
}

export { ShieldController }