import { useSelector } from "react-redux";
import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import CardNote from "../../Components/ui/Table/CardNote";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import {  DeleteNotes, getAllNotes } from "../../api/Notes";
import type { RootState } from "../../store/store";

export default function NotesContent() {
  const user = useSelector((state: RootState) => state.dataStorage.user);

  return (
    <div className="bg-[var(--font)] h-screen ">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-64 items-center">
          <TextHeaderTable text="Les notes" />
          { user.role === "admin" &&  <ButtonLink link="/admin/notes/add" text="Ajoute +"  /> }
        </div>
        <CardNote
          functionMutation={DeleteNotes}
          title="Notes" 
          FnQueryGet={getAllNotes} 
          query="notes" />
    </div>
  )
}