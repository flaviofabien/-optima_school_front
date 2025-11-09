import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableCategorie from "../../Components/ui/Table/TableCategorie";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeletePayement, getAllPayement } from "../../api/Payement";

const userColumns = [
  {
    header: 'Ecole',
    accessor: 'dateDebut',
    render: (item : any) => item.Ecole.nom
  },
  {
    header: 'Etudiant',
    accessor: 'dateFin',
    render: (item : any) => `${ item.Student.User.nom } ${ item.Student.User.prenom }`
  },
  {
    header: 'Type',
    accessor: 'type',
    render: (item : any) => item.type
  },
  {
    header: 'Motif',
    accessor: 'niveau',
    render: (item : any) => item.motif
  },
  {
    header: 'Prix',
    accessor: 'prix',
    render: (item : any) =>  `${item.prix } Ar`
  },
];


export default function PayementContent() {
  return (
    <div className="">
        <div className="flex w-full  justify-between items-end ">
            <TextHeaderTable text="Payements" />
            <ButtonLink link={`/admin/payements/add`} text="+ Ajoute "  />
        </div>
        <TableCategorie
          functionMutation={DeletePayement} 
          title="Payements" 
          FnQueryGet={getAllPayement} 
          columns={userColumns} 
          query="payements" />
    </div>
  )
}