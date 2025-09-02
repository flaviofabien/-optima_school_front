import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableContainer from "../../Components/ui/Table/TableContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteMatieres, getAllMatieres } from "../../api/Matieres";

const userColumns = [
  {
    header: 'nom',
    accessor: 'nom',
    render: (item : any) => item.nom
  },
  {
    header: 'coefficiant',
    accessor: 'coefficiant',
    render: (item : any) => item.coefficiant
  },
  {
    header: 'classe',
    accessor: 'classe',
    render: (item : any) => item.Classe.nom
  },

];

export default function MatiereContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les Matieres" />
          <ButtonLink link="/admin/matieres/add" text="Ajoute +"  />
        </div>
        <TableContainer
          functionMutation={DeleteMatieres}
          title="Matiere" 
          FnQueryGet={getAllMatieres} 
          columns={userColumns} 
          query="matieres" />
    </div>
  )
}