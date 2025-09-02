import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableContainer from "../../Components/ui/Table/TableContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteClasses, getAllClasses } from "../../api/Classes";

const userColumns = [
  {
    header: 'nom',
    accessor: 'nom',
    render: (item : any) => item.nom
  },
  {
    header: 'Ecole',
    accessor: 'Ecole',
    render: (item : any) => item.Ecole.nom
  },
];


export default function ClasseContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les Classes" />
          <ButtonLink link="/admin/classes/add" text="Ajoute +"  />
        </div>
        <TableContainer
          functionMutation={DeleteClasses}
          title="Classe" 
          FnQueryGet={getAllClasses} 
          columns={userColumns} 
          query="classes" />
    </div>
  )
}