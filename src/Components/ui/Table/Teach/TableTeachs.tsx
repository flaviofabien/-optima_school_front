import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import TableTeachData from "./TableTeachData";
import { getAllTeachs } from "../../../../api/Teach";
import type { TeachType } from "../../../../typescript/Teach";

export default function TableTeach() {
  const token = useSelector((state: RootState) => state.dataStorage.token);
  
  const {data,isLoading,isError} = useQuery<TeachType[]>({
    queryKey: ["teachs",token],
    queryFn: () => getAllTeachs(token!),
  })

  console.log(data);
  

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
              <div className="">Nom et prenom</div>
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
              <div className="">specialite</div>
            </td>
            <td className="px-6 py-4">
              <div className="">status</div>
            </td>
            <td className="px-6 py-4 ">Action</td>
          </tr>
          {
            data?.map((items: TeachType) => {
              return <TableTeachData items={items} />;
            }
          )}
        </table>
      </div>
    </div>
  )
}