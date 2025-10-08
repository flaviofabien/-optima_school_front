import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { dataFilterEcole } from "../../Components/ui/FilterData";
import EcoleCardContainer from "../../Components/ui/Table/EcoleCard";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteEcoles, getAllEcoles } from "../../api/Ecole";

export default function EcoleContent() {
  return (
    <div className="bg-[var(--font)] h-screen w-full">
        <Header />
        <div className="my-8 flex justify-between lg:pl-64 items-end pr-8">
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