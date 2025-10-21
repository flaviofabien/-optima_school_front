import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import CardUser from "../../Components/ui/Table/CardUser";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteUsers, getAllUsers } from "../../api/Users";


export default function UserContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="w-full mt-8 flex max-[388px]:flex-col flex-row gap-8 max-[388px]:gap-4 
                        max-[388px]:justify-center justify-between px-4 lg:px-8 lg:pl-64 max-[388px]:items-center items-start">
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