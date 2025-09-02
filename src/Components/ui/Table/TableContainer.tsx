import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CardConfirmDelete from "../Card/CardConfirmDelete";
import type { RootState } from "../../../store/store";


type Props = {
  columns: any[]; 
  FnQueryGet: (token: string) => Promise<any[]>;
  query : string
  title : string
  functionMutation :  (id: number, token: string) => void;
};

export default function TableContainer({ columns , FnQueryGet , query ,title , functionMutation }: Props) {
  const token = useSelector((state: RootState) => state.dataStorage.token);

  const { data, isLoading, isError } = useQuery<any[]>({
    queryKey: [query, token],
    queryFn: () => FnQueryGet(token!),
  });

  const [show, setShow] = useState({
    show: false,
    id: NaN
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <div>...loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="lg:pl-60 lg:pr-8">
      <div className="mt-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--color-primary)] text-[var(--white)]">
              {/* <td className="px-6 py-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-color-base transition duration-150 ease-in-out"
                />
              </td> */}
              {columns.map((column, index) => (
                <td key={index} className="px-6 py-4 text-sm font-medium">
                  {column.header}
                </td>
              ))}
              <td className="px-6 py-4 text-sm font-medium">Action</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any) => (
              <tr key={item.id} className="w-96 border-b-2 border-[var(--color-primary-transparent)] bg-[var(--white)]">
                {/* <td className="px-6 py-4">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-color-base transition duration-150 ease-in-out" />
                </td> */}
                {columns.map((column, index) => (
                  <td key={index} className="px-6 py-4">
                    {column.render(item)}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <BiEdit onClick={() => navigate(`/admin/${query}/edit/${item.id}`)} className="inline-block mr-4 text-xl" />
                  <MdDelete onClick={() => setShow({ id: item.id, show: true })} className="inline-block text-xl" />
                </td>
                {show.show && (
                  <CardConfirmDelete
                    navigate={`/admin/${query}`}
                    functionMutation={functionMutation}
                    show={show}
                    setShow={setShow}
                    title={title}
                    fullName={`${query}`}
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}