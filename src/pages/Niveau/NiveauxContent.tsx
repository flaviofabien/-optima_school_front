import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableNiveau from "../../Components/ui/Table/TableNiveau";
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
    <div className="">
        <div className="flex w-full  justify-between items-end ">
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