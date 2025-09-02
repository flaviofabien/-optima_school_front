import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import CardContainer from "../../Components/ui/Table/CardContainer";
import TableContainer from "../../Components/ui/Table/TableContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteStudents, getAllStudents } from "../../api/Student";


export default function StudentContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les eleves" />
          <ButtonLink link="/admin/students/add" text="Ajoute +"  />
        </div>
        <CardContainer
          functionMutation={DeleteStudents}
          title="Eleve" 
          FnQueryGet={getAllStudents} 
          query="students" />
    </div>
  )
}