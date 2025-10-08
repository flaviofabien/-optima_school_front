import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { dataFilterSalle } from "../../Components/ui/FilterData";
import TableNiveau from "../../Components/ui/Table/TableNiveau";
import TableSalle from "../../Components/ui/Table/TableSalle";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteNiveau, getAllNiveaux } from "../../api/Niveau";

const userColumns = [
  {
    header: 'Nom',
    accessor: 'nom',
    render: (item : any) => item.nom
  },
];


export default function NiveauContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="flex w-full lg:pl-64 my-8 justify-between items-end pr-8">
            <TextHeaderTable text="Niveaux" />
            <ButtonLink link={`/admin/niveaux/add`} text="+ Ajoute "  />
        </div>
        <TableNiveau
        
          functionMutation={DeleteNiveau} 
          title="Niveaux" 
          FnQueryGet={getAllNiveaux} 
          columns={userColumns} 
          query="niveaux" />
    </div>
  )
}