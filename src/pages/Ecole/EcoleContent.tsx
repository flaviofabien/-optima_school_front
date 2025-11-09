import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { dataFilterEcole } from "../../Components/ui/FilterData";
import EcoleCardContainer from "../../Components/ui/Table/EcoleCard";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteEcoles, getAllEcoles } from "../../api/Ecole";

export default function EcoleContent() {
  return (
    <div className="">
        <div className="mb-8 flex justify-between items-end ">
          <TextHeaderTable text="Ecole" />
          <ButtonLink link={`/admin/ecoles/add`} text="+ Ajoute "  />
        </div>
        <EcoleCardContainer
          functionMutation={DeleteEcoles}
          title="Ecole" 
          FnQueryGet={getAllEcoles} 
          dataFilterSelect={dataFilterEcole}
          query="ecoles" />
    </div>
  )
}