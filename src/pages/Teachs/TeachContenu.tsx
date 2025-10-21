import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { dataFilterStudent } from "../../Components/ui/FilterData";
import CardContainerTeach from "../../Components/ui/Table/CardContainerTeach";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteTeachs, getAllTeachs } from "../../api/Teach";


export default function TeachContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
      <Header />
      <div className="mt-8 flex justify-between px-8 lg:pl-64 items-center">
        <TextHeaderTable text="Les enseignant" />
        <ButtonLink link="/admin/teachs/add" text="Ajoute +"  />
      </div>
      <CardContainerTeach
          functionMutation={DeleteTeachs}
          title="Enseignant" 
          FnQueryGet={getAllTeachs}  
          dataFilter={dataFilterStudent}
          query="teachs" />
    </div>
  )
}