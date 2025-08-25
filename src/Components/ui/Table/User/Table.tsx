import { useQuery } from "@tanstack/react-query"
import TableData from "./TableData"
import { getAllUsers } from "../../../../api/Users"
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import type { userType } from "../../../../typescript/Users";

export default function Table() {
  const token = useSelector((state: RootState) => state.dataStorage.token);
  
  const {data,isLoading,isError} = useQuery<userType[]>({
    queryKey: ["users",token],
    queryFn: () => getAllUsers(token!),
  })

  if (isLoading) {
    return <div>...loading</div>
  }
  if (isError) {
    return <div>Error</div>
  }
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
              <div className="">Email</div>
            </td>
            <td className="px-6 py-4">Role</td>
            <td className="px-6 py-4 text-sm font-medium">inline</td>
          </tr>
          {data?.map((items: userType) => {

            return <TableData items={items} />;
          })}
        </table>
      </div>
    </div>
  )
}