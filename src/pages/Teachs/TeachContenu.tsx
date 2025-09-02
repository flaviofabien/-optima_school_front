import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableContainer from "../../Components/ui/Table/TableContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteTeachs, getAllTeachs } from "../../api/Teach";


const userColumns = [
  {
    header: 'nom et prenom',
    accessor: 'nom et prenom',
    render: (item : any) =>`${item.nom} ${item.prenom}`
  }
  ,
  {
    header: 'Sex',
    accessor: 'sex',
    render: (item : any) => `${item.sex}`
  },
  {
    header: 'address',
    accessor: 'address',
    render: (item : any) => item.address
  },
  {
    header: 'phone',
    accessor: 'phone',
    render: (item : any) => item.phone
  },
  {
    header: 'specialite',
    accessor: 'specialite',
    render: (item : any) => item.specialite
  },
  {
    header: 'status',
    accessor: 'status',
    render: (item : any) => item.status
  },
  
];

export default function TeachContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
      <Header />
      <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
        <TextHeaderTable text="Les Enseignant" />
        <ButtonLink link="/admin/teachs/add" text="Ajoute +"  />
      </div>
      <TableContainer
          functionMutation={DeleteTeachs}
          title="Ensignant" 
          FnQueryGet={getAllTeachs} 
          columns={userColumns} 
          query="teachs" />
    </div>
  )
}