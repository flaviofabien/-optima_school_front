import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableContainer from "../../Components/ui/Table/TableContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteSalles, getAllSalles } from "../../api/Salles";

const userColumns = [
  {
    header: 'nom',
    accessor: 'nom',
    render: (item : any) => item.nom
  },
  {
    header: 'effectif',
    accessor: 'effectif',
    render: (item : any) => item.effectif
  },
  {
    header: 'Classe',
    accessor: 'Classe',
    render: (item : any) => item.Classe.nom
  },
];


export default function SalleContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les Salle" />
          <ButtonLink link="/admin/salles/add" text="Ajoute +"  />
        </div>
        <TableContainer
          functionMutation={DeleteSalles}
          title="Salles" 
          FnQueryGet={getAllSalles} 
          columns={userColumns} 
          query="salles" />
    </div>
  )
}