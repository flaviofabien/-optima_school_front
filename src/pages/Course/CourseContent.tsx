import Header from "../../Components/header/Header";
import ButtonLink from "../../Components/ui/Button/ButtonLink";
import TableContainer from "../../Components/ui/Table/TableContainer";
import TextHeaderTable from "../../Components/ui/Text/TextinTable";
import { DeleteCourses, getAllCourses } from "../../api/Course";

const userColumns = [
  {
    header: 'Jour',
    accessor: 'jour',
    render: (item : any) => item.jour
  },
  {
    header: 'Heure de debut',
    accessor: 'heureDebut',
    render: (item : any) => `${item.heureDebut}h` 
  },
  {
    header: 'Heure de fin',
    accessor: 'heureFin',
    render: (item : any) => `${item.heureFin}h` 
  },
  {
    header: 'Enseignant',
    accessor: 'Enseignant',
    render: (item : any) => item.Teacher?.nom
  },
  {
    header: 'Salle',
    accessor: 'Salle',
    render: (item : any) => item.Salle.nom
  },
  {
    header: 'Matiere',
    accessor: 'Matiere',
    render: (item : any) => item.Matiere.nom
  },
];

export default function CourseContent() {
  return (
    <div className="bg-[var(--font)] h-screen">
        <Header />
        <div className="mt-8 flex justify-between px-8 lg:pl-60 items-center">
          <TextHeaderTable text="Les Course" />
          <ButtonLink link="/admin/courses/add" text="Ajoute +"  />
        </div>
        <TableContainer
          functionMutation={DeleteCourses}
          title="Course" 
          FnQueryGet={getAllCourses} 
          columns={userColumns} 
          query="courses" />
    </div>
  )
}