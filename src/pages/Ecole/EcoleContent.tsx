import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableContainer from "../../Components/ui/Table/TableContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteEcoles, getAllEcoles } from "../../api/Ecole";

const userColumns = [
  {
    header: 'nom',
    accessor: 'nom',
    render: (item : any) => item.nom
  },
  {
    header: 'adresse',
    accessor: 'adresse',
    render: (item : any) => item.adresse
  },

  {
    header: 'type',
    accessor: 'type',
    render: (item : any) => item?.type?.map( (i : string) => `-${i} `  )
  },
  {
    header: 'anneeScolaire',
    accessor: 'anneeScolaire',
    render: (item : any) => item.anneeScolaire
  }
];

export default function EcoleContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les Ecoles" />
          <ButtonLink link="/admin/ecoles/add" text="Ajoute +"  />
        </div>
        <TableContainer
          functionMutation={DeleteEcoles}
          title="Ecole" 
          FnQueryGet={getAllEcoles} 
          columns={userColumns} 
          query="ecoles" />
    </div>
  )
}
