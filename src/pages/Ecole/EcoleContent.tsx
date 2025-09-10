import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { dataFilterEcole } from "../../Components/ui/FilterData";
import EcoleCardContainer from "../../Components/ui/Table/EcoleCard";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteEcoles, getAllEcoles } from "../../api/Ecole";

export default function EcoleContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les ecoles" />
          <ButtonLink link="/admin/ecoles/add" text="Ajoute +"  />
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
