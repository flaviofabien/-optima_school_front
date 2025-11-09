import { useSelector } from "react-redux";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import { dataFilterMatiere } from "../../Components/ui/FilterData";
import TableMatiere from "../../Components/ui/Table/TableMatiere";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteAbsence, getAllAbsence } from "../../api/Absence";
import type { RootState } from "../../store/store";

const userColumns = [
  {
    header: 'Motif',
    accessor: 'motif',
    render: (item : any) => item.motif
  },
  {
    header: 'Etudiant',
    accessor: 'Etudiant',
    render: (item : any) => item.Student?.User.nom
  },
   {
    header: 'Date de debut',
    accessor: 'dateDebut',
    render: (item : any) => item.dateDebut
  },
   {
    header: 'Date de fin',
    accessor: 'dateFin',
    render: (item : any) => item.dateFin
  },
   {
    header: 'Heure de debut',
    accessor: 'heurFin',
    render: (item : any) => item.heurDebut
  },
  {
    header: 'Heure de fin',
    accessor: 'heurFin',
    render: (item : any) => item.heurFin
  },

];

export default function AbsenceContent() {
  const user = useSelector((state: RootState) => state.dataStorage.user);

  return (
    <div className="">
        <div className=" flex justify-between items-center">
          <TextHeaderTable text="Les Absence" />
          {user.role === "admin" &&  <ButtonLink link="/admin/absences/add" text="Ajoute +"  />}
        </div>
        <TableMatiere
         dataFilterSelect={dataFilterMatiere}
          functionMutation={DeleteAbsence}
          title="Absence" 
          FnQueryGet={getAllAbsence} 
          columns={userColumns} 
          query="absences" />
    </div>
  )
}