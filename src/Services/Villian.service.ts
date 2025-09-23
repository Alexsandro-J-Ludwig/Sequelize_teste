import Vilians from "../modals/villians.modal";
import { VillianDTO, VillianResponseDTO } from "../DTOs/VillianDTO";

class VillianService {
    static async createVillian(dto:VillianDTO):Promise<VillianResponseDTO>{
        //Valida se existe um heroi, se existir, retorna um erro
        const villianValidatorExist = await Vilians.findOne({ where: {nome:dto.nome}});
        if(villianValidatorExist) throw new Error("Vilão já existe");

        //Realiza a criação de vilão e retorna os dados ao usuário;
        const data = await Vilians.create(dto);
        const villianResponseDTO = new VillianResponseDTO(
            data.id,
            data.nome,
            data.poder,
            data.vitorias,
            data.derrotas,
            "Vilão criado"
        )
        return villianResponseDTO;
    };
}

export { VillianService }