import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { dataFilterMatiere } from "../../Components/ui/FilterData";
import TableMatiere from "../../Components/ui/Table/TableMatiere";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteMatieres, getAllMatieres } from "../../api/Matieres";

const userColumns = [
  {
    header: 'Nom',
    accessor: 'nom',
    render: (item : any) => item.nom
  },
  {
    header: 'Coefficiant',
    accessor: 'coefficiant',
    render: (item : any) => item.coefficiant
  },
  {
    header: 'Classe',
    accessor: 'classe',
    render: (item : any) => item?.Classe?.nom
  },

];

export default function MatiereContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-64 items-center">
          <TextHeaderTable text="Les Matieres" />
          <ButtonLink link="/admin/matieres/add" text="Ajoute +"  />
        </div>
        <TableMatiere
         dataFilterSelect={dataFilterMatiere}
          functionMutation={DeleteMatieres}
          title="Matiere" 
          FnQueryGet={getAllMatieres} 
          columns={userColumns} 
          query="matieres" />
    </div>
  )
}