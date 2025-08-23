import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import Table from "../../Components/ui/Table/Table";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";

export default function UserContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les Utilisateurs" />
          <ButtonLink link="/admin/users/add" text="Ajoute +"  />
        </div>
        <Table />
    </div>
  )
}