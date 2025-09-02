import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableContainer from "../../Components/ui/Table/TableContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteUsers, getAllUsers } from "../../api/Users";

const userColumns = [
  {
    header: 'Nom et Prénom',
    accessor: 'nom_prenom',
    render: (item : any) => `${item.nom} ${item.prenom}`
  },
  {
    header: 'Email',
    accessor: 'email',
    render: (item : any) => item.email
  },
  {
    header: 'Rôle',
    accessor: 'role',
    render: (item : any) => item.role
  }
];

export default function UserContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les Utilisateurs" />
          <ButtonLink link="/admin/users/add" text="Ajoute +"  />
        </div>
        <TableContainer 
          title="Users"
          functionMutation={DeleteUsers}
          FnQueryGet={getAllUsers} 
          columns={userColumns} 
          query="users" />
    </div>
  )
}