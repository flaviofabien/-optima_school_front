import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import CardNote from "../../Components/ui/Table/CardNote";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteNotes, getAllNotes } from "../../api/Notes";

export default function NotesContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les notes" />
          <ButtonLink link="/admin/notes/add" text="Ajoute +"  />
        </div>
        <CardNote
          functionMutation={DeleteNotes}
          title="Notes" 
          FnQueryGet={getAllNotes} 
          query="notes" />
    </div>
  )
}