import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableTeach from "../../Components/ui/Table/Teach/TableTeachs";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";

export default function TeachContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
      <Header />
      <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
        <TextHeaderTable text="Les Enseignant" />
        <ButtonLink link="/admin/teachs/add" text="Ajoute +"  />
      </div>
      <TableTeach />
    </div>
  )
}