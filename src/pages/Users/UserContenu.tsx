import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableContainer from "../../Components/ui/Table/TableContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteUsers, getAllUsers } from "../../api/Users";

const userColumns = [
  {
    header: 'Nom complet',
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
        <div className="w-full mt-8 flex max-[388px]:flex-col flex-row gap-8 max-[388px]:gap-4 
                        max-[388px]:justify-center justify-between px-4 lg:px-8 lg:pl-60 max-[388px]:items-center items-start">
          <TextHeaderTable text="Les utilisateurs" />
          <ButtonLink link="/admin/users/add" text="Ajoute +"  />
        </div>
        <TableContainer 
          title="Utilisateur"
          functionMutation={DeleteUsers}
          FnQueryGet={getAllUsers} 
          columns={userColumns} 
          query="users" />
    </div>
  )
}