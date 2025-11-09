import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableCategorie from "../../Components/ui/Table/TableCategorie";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteCategorie, getAllCategorie } from "../../api/Categorie";

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
    header: 'Niveau',
    accessor: 'niveau',
    render: (item : any) => item.Niveaux?.nom
  },
  {
    header: 'Annee Scolaire',
    accessor: 'anneescolaire',
    render: (item : any) => item.AnneeScolaire?.nom
  },
];


export default function PeriodeContent() {
  return (
    <div className="">
        <div className="flex w-full  justify-between items-end pr-8">
            <TextHeaderTable text="Periodes" />
            <ButtonLink link={`/admin/periodes/add`} text="+ Ajoute "  />
        </div>
        <TableCategorie
          functionMutation={DeleteCategorie} 
          title="Periodes" 
          FnQueryGet={getAllCategorie} 
          columns={userColumns} 
          query="periodes" />
    </div>
  )
}