import { Herois } from "../modals/heros.modal.ts"

//Controlador de heroi
class HeroController{
    static async createHero(req, res){
        try {
            const {nome, poder} = req.body;

            if(!nome || !poder){
                return res.status(400).send({ msg:"Nome e poder não podem estar vazios" });
            }
            
            //Realiza a implementação dos atributos de um heroi
            const heroi = await Herois.create({
                nome:nome, poder:poder
            })

            if(!heroi){
                return res.status(400).send({ msg:"Falha ao criar heroi" })
            }

            res.status(201).send({ msg:"Heroi cadastrado", data: heroi});

        } catch (error) {
            res.status(500).send({msg:`Erro ao cadastrar Heroi: ${error}`});
        }
    }

    static async getAllHeros(_, res){
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

    static async getHero(req, res){
        try{
            const { nome } = req.query;

            if(!nome){
                return res.status(400).send("Informe um heroi");
            };

            const response = await Herois.findOne({ where: {nome:nome} });

            res.status(200).send({ success: true, data: response});
        } catch(err){
            res.status(500).send({ Success: false, error: `Erro ao buscar heroi: ${err}`});
        }
    }

    static async updateHero(req, res){
        try {
            const {nomeHeroiConsulta, nome, poder, vitorias, derrotas} = req.body;

            if(!nomeHeroiConsulta){
                return res.status(400).send({ msg:"Nenhum heroi informado" });
            };

            const fields: { [key: string]: any }= {};

            if (nome != null) fields.nome = nome;
            if (poder != null) fields.poder = poder;
            if (vitorias != null) fields.vitorias = vitorias;
            if (derrotas != null) fields.derrotas = derrotas;

            if (Object.keys(fields).length === 0) {
                return res.status(400).send({ msg: "Nenhum campo para atualizar" });
              }

            const [updated] = await Herois.update(fields, {
                where: { nome: nomeHeroiConsulta },
              });

            if (updated === 0) {
                return res.status(404).send({ msg: "Herói não encontrado" });
            }

            return res.status(200).send({ msg: "Herói atualizado com sucesso" });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ msg: "Erro no servidor", error });
        }
    }

    static async deleteHero(req, res){
        try {
            const { id } = req.body;

            await Herois.destroy({ where: { id }});
            res.status(200).send({ success: true });
        } catch (err) {
            console.log(err);
            res.status(500).send({ success: false, error: `Erro ao excluir heroi: ${err}`})
        }
    }
}

export default HeroController;