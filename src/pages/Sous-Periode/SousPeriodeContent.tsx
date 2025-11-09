import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableCategorie from "../../Components/ui/Table/TableCategorie";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteSousPeriode, getAllSousPeriode } from "../../api/Sous-periode";

const userColumns = [
  {
    header: 'Nom',
    accessor: 'nom',
    render: (item : any) => item.nom
  },
  {
    header: 'Date debut',
    accessor: 'dateDebut',
    render: (item : any) => item.dateDebut
  },
  {
    header: 'Date fin',
    accessor: 'dateFin',
    render: (item : any) => item.dateFin
  },
  {
    header: 'Type',
    accessor: 'type',
    render: (item : any) => item.type
  },
  {
    header: 'Categorie',
    accessor: 'Categorie',
    render: (item : any) => item.Categorie?.nom
  },
];


export default function SousPeriodeContent() {
  return (
    <div className="">
        <div className="flex w-full justify-between items-end pr-8">
            <TextHeaderTable text=" Sous Periodes" />
            <ButtonLink link={`/admin/sous-periodes/add`} text="+ Ajoute "  />
        </div>
        <TableCategorie
          functionMutation={DeleteSousPeriode} 
          title="Sous Periodes" 
          FnQueryGet={getAllSousPeriode} 
          columns={userColumns} 
          query="sous-periodes" />
    </div>
  )
}