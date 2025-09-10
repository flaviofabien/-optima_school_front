import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { dataFilterStudent } from "../../Components/ui/FilterData";
import CardContainer from "../../Components/ui/Table/CardContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteTeachs, getAllTeachs } from "../../api/Teach";


export default function TeachContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
      <Header />
      <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
        <TextHeaderTable text="Les enseignant" />
        <ButtonLink link="/admin/teachs/add" text="Ajoute +"  />
      </div>
      <CardContainer
          functionMutation={DeleteTeachs}
          title="Enseignant" 
          FnQueryGet={getAllTeachs} 
          dataFilter={dataFilterStudent}
          query="teachs" />
    </div>
  )
}