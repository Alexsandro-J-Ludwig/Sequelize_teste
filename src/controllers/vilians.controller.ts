import Vilians from "../modals/villians.modal.ts";

// Controlador de vilão
class VillainController {
  static async createVillain(req, res) {
    try {
      const { nome, poder } = req.body;

      if (!nome || !poder) {
        return res
          .status(400)
          .send({ msg: "Nome e poder não podem estar vazios" });
      }

      // Realiza a implementação dos atributos de um vilão
      const vilao = await Vilians.create({
        nome: nome,
        poder: poder,
      });

      if (!vilao) {
        return res.status(400).send({ msg: "Falha ao criar vilão" });
      }

      res.status(201).send({ msg: "Vilão cadastrado", data: vilao });
    } catch (error) {
      res.status(500).send({ msg: `Erro ao cadastrar vilão: ${error}` });
    }
  }

  static async getAllVillians(_, res){
    try {
      const response = await Vilians.findAll();

      if(!response){
        return res.status(404).send({ msg:"Nenhum vilão encontrado" })
      }

      res.status(200).send({ success:true, data:response });
    } catch (error) {
      res.status(500).send({ msg: `Erro ao cadastrar vilão: ${error}` });
    }
  }

  static async getVillain(req, res) {
    try {
      const { nome } = req.query;

      if (!nome) {
        return res.status(400).send("Informe um vilão");
      }

      const response = await Vilians.findOne({ where: { nome: nome } });

      res.status(200).send({ success: true, data: response });
    } catch (err) {
      res
        .status(500)
        .send({ success: false, error: `Erro ao buscar vilão: ${err}` });
    }
  }

  static async updateVillain(req, res) {
    try {
      const { nomeVilaoConsulta, nome, poder, vitorias, derrotas } = req.body;

      if (!nomeVilaoConsulta) {
        return res.status(400).send({ msg: "Nenhum vilão informado" });
      }

      const fields: { [key: string]: any } = {};

      if (nome != null) fields.nome = nome;
      if (poder != null) fields.poder = poder;
      if (vitorias != null) fields.vitorias = vitorias;
      if (derrotas != null) fields.derrotas = derrotas;

      if (Object.keys(fields).length === 0) {
        return res.status(400).send({ msg: "Nenhum campo para atualizar" });
      }

      const [updated] = await Vilians.update(fields, {
        where: { nome: nomeVilaoConsulta },
      });

      if (updated === 0) {
        return res.status(404).send({ msg: "Vilão não encontrado" });
      }

      return res.status(200).send({ msg: "Vilão atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ msg: "Erro no servidor", error });
    }
  }

  static async deleteVillain(req, res) {
    try {
      const { id } = req.body;

      await Vilians.destroy({ where: { id } });
      res.status(200).send({ success: true });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, error: `Erro ao excluir vilão: ${err}` });
    }
  }
}

export default VillainController;
