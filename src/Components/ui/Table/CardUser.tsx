import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loader/Loading";
import { IPLocal } from "../../../api/IP";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CardConfirmDelete from "../Card/CardConfirmDelete";

type Props = {
    FnQueryGet: (token: string) => Promise<any>;
      query : string
      title : string
      functionMutation :  (id: number, token: string) => Promise<any>  ;
}

export default function CardUser({ FnQueryGet , query ,title , functionMutation}: Props) {
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
<div className=' w-full mt-8 '>
        <div className='flex flex-wrap gap-8 '>
          {
              data?.filter((o) => o.role == "admin"  ).map( i => (
                  <div className="flex  w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                      <div className=" p-4">
                          <img className='w-20 h-20   object-cover rounded-full' src={IPLocal  + i.img} alt={IPLocal + "/" + i.img} />
                      </div>

                      <div className=" p-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900"> {i.nom} {i.prenom}</h3>
                        </div>

                        <div className="space-y-2 text-sm text-gray-700">
                          
                          <div className="flex justify-between items-center ">
                              <span>{i.email}</span>
                          </div>
                            <p className="">
                                <BiEdit onClick={() => navigate(`/admin/${query}/edit/${i.id}`)} className="inline-block mr-4 text-2xl" />
                                <MdDelete onClick={() => setShow({ id: i.id, show: true })} className="inline-block text-2xl" />
                            </p>
                          
                        </div>
                      </div>
                  </div>
          
              ) )
          }
        </div>
        {show.show && (
            <CardConfirmDelete
            navigate={`/admin/${query}`}
            functionMutation={functionMutation}
            show={show}
            setShow={setShow}
            title={title}
            />
        )}

  </div>  )
}