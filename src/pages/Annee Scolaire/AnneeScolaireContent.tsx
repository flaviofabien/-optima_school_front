import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableCategorie from "../../Components/ui/Table/TableCategorie";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteAnneeScolaire, getAllAnneeScolaire } from "../../api/AnneeScolaire";

const userColumns = [
  {
    header: 'Nom',
    accessor: 'nom',
    render: (item : any) => item.nom
  },
  {
    header: 'Date debut',
    accessor: 'Date debut',
    render: (item : any) => item.dateDebut
  },
  {
    header: 'Date fin',
    accessor: 'date fin',
    render: (item : any) => item.dateFin
  },
  {
    header: 'Ecole',
    accessor: 'ecole',
    render: (item : any) => item?.Ecole?.nom
  },
];


export default function AnneeScolaireContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="flex w-full lg:pl-64 my-8 justify-between items-end pr-8">
            <TextHeaderTable text="AnneeScolaire" />
            <ButtonLink link={`/admin/annee-scolaires/add`} text="+ Ajoute "  />
        </div>
        <TableCategorie
          functionMutation={DeleteAnneeScolaire} 
          title="AnneeScolaire" 
          FnQueryGet={getAllAnneeScolaire} 
          columns={userColumns} 
          query="annee-scolaires" />
    </div>
  )
}