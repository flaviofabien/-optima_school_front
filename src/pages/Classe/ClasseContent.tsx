import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { dataFilterClasse} from "../../Components/ui/FilterData";
import TableClasse from "../../Components/ui/Table/TableClasse";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteClasses, getAllClasses } from "../../api/Classes";

const userColumns = [
  {
    header: 'Nom',
    accessor: 'nom',
    render: (item : any) => item.nom
  },
  {
    header: 'Niveau',
    accessor: 'Niveau',
    render: (item : any) => item?.Niveaux?.nom
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
        <div className="mt-8 flex justify-between px-8 lg:pl-64 items-center">
          <TextHeaderTable text="Les Classes" />
          <ButtonLink link="/admin/classes/add" text="Ajoute +"  />
        </div>
        <TableClasse
          functionMutation={DeleteClasses}
          dataFilterSelect={dataFilterClasse}
          title="Classe" 
          FnQueryGet={getAllClasses} 
          columns={userColumns} 
          query="classes" />
    </div>
  )
}