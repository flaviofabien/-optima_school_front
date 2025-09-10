import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CardConfirmDelete from "../Card/CardConfirmDelete";
import type { RootState } from "../../../store/store";
import Loading from "../Loader/Loading";

type Props = {
  columns: any[]; 
  FnQueryGet: (token: string) => Promise<any[]>;
  query : string
  title : string
  functionMutation :  (id: number, token: string) =>  Promise<any>;
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

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  return (
    <div className="lg:pl-60 lg:pr-8 ">
      <div className="overflow-auto w-full max-h-[700px]">
        <div className="mt-8 ">
          <table className="overflow-auto w-full">
            <thead className="text-lg">
              <tr className="bg-[var(--color-primary)] text-[var(--white)]">
                {columns.map((column, index) => (
                  <td key={index} className="lg:px-6 px-4 py-4  font-medium">
                    {column.header}
                  </td>
                ))}
                <td className="lg:px-6 px-4 py-4  font-medium"></td>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any) => (
                <tr key={item.id} className="w-96 border-b-2 border-[var(--color-primary-transparent)] bg-[var(--white)]">
                  {columns.map((column, index) => (
                    <td key={index} className="lg:px-6 px-4 py-4">
                      {column.render(item)}
                    </td>
                  ))}
                  <td className="lg:px-6 px-4 py-4">
                    <BiEdit onClick={() => navigate(`/admin/${query}/edit/${item.id}`)} className="inline-block mr-4 text-2xl cursor-pointer scale-110" />
                    <MdDelete onClick={() => setShow({ id: item.id, show: true })} className="inline-block text-2xl cursor-pointer scale-110" />
                  </td>
                  {show.show && (
                    <CardConfirmDelete
                      navigate={`/admin/${query}`}
                      functionMutation={functionMutation}
                      show={show}
                      setShow={setShow}
                      title={title}
                    />
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}