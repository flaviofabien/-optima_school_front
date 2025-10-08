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
];


export default function CategorieContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="flex w-full lg:pl-64 my-8 justify-between items-end pr-8">
            <TextHeaderTable text="Categorie" />
            <ButtonLink link={`/admin/categories/add`} text="+ Ajoute "  />
        </div>
        <TableCategorie
          functionMutation={DeleteCategorie} 
          title="Categorie" 
          FnQueryGet={getAllCategorie} 
          columns={userColumns} 
          query="categories" />
    </div>
  )
}