import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import TableStudentData from "./TableStudentData";
import type { StudentsType } from "../../../../typescript/Student";
import { getAllStudents } from "../../../../api/Student";

export default function TableStudent() {
  const token = useSelector((state: RootState) => state.dataStorage.token);
  
  const {data,isLoading,isError} = useQuery<StudentsType[]>({
    queryKey: ["students",token],
    queryFn: () => getAllStudents(token!),
  })

  if (isLoading) return <div>...loading</div>
  if (isError) return <div>Error</div>
  
  return (
    <div className="lg:pl-60 lg:pr-8">
      <div className="mt-8 overflow-x-auto">
        <table className="w-full">
          <tr className="bg-[var(--color-primary)] text-[var(--white)]">
            <td className="px-6 py-4">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-color-base transition duration-150 ease-in-out"
              />
            </td>
            <td className="px-6 py-4">
              <div className="">matricule</div>
            </td>
            <td className="px-6 py-4">
              <div className="">Nom et prenom</div>
            </td>
            <td className="px-6 py-4">
              <div className="">dateNaissance</div>
            </td>
            <td className="px-6 py-4">
              <div className="">sex</div>
            </td>
            <td className="px-6 py-4">
              <div className="">address</div>
            </td>
            <td className="px-6 py-4">
              <div className="">phone</div>
            </td>
            <td className="px-6 py-4">
              <div className="">classes</div>
            </td>
            <td className="px-6 py-4">
              <div className="">status</div>
            </td>
            <td className="px-6 py-4 ">Action</td>
          </tr>
          {
            data?.map((items: StudentsType) => {
              return <TableStudentData items={items} />;
            }
          )}
        </table>
      </div>
    </div>
  )
}