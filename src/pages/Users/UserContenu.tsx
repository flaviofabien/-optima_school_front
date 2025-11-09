import ButtonLink from "../../Components/ui/Button/ButtonLink";
import CardUser from "../../Components/ui/Table/CardUser";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteUsers, getAllUsers } from "../../api/Users";


export default function UserContent() {
  return (
    <div className="">
        <div className="flex lg:justify-between lg:flex-row items-center lg:items-start justify-center flex-col">
          <TextHeaderTable text="Les utilisateurs" />
          <ButtonLink link="/admin/users/add" text="Ajoute +"  />
        </div>
        <CardUser 
          title="Utilisateur"
          functionMutation={DeleteUsers}
          FnQueryGet={getAllUsers} 
          query="users" />
    </div>
  )
}