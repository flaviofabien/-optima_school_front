import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableStudent from "../../Components/ui/Table/Students/TableStudents";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";

export default function StudentContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les eleves" />
          <ButtonLink link="/admin/students/add" text="Ajoute +"  />
        </div>
        <TableStudent />
    </div>
  )
}