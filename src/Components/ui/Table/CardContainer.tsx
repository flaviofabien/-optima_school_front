import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardConfirmDelete from '../Card/CardConfirmDelete';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { IPLocal } from '../../../api/IP';
import type { RootState } from '../../../store/store';
import Filter from '../Filter';
import Pagination from '../Pagination';
import Loading from '../Loader/Loading';

type Props = {
    FnQueryGet: (
      token: string ,  
      limit: number,
      page: number,
      sortBy: string,
      order: string,
      search: string) => Promise<any>;
    query : string
    title : string
    functionMutation :  (id: number, token: string) => Promise<any[]>;
    dataFilter : any
};

export default function CardContainer({   FnQueryGet , query ,title , functionMutation ,dataFilter }: Props) {
  const  [paramsPatient ,setParamsPatient] = useState( {
    limit : 3,
    page : 1,
    sortBy : "sex",
    order : "order",
    search : ""
  } )     
  const token = useSelector((state: RootState) => state.dataStorage.token);

    const { data, isLoading, isError } = useQuery<any>({
      queryKey : [query,token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
      queryFn : () =>  FnQueryGet(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
    });
  
    const [show, setShow] = useState({
      show: false,
      id: NaN
    });
  
    const navigate = useNavigate();

    console.log(data)
  
    if (isLoading) {
      return <Loading />;
    }
    if (isError) {
      return <div>Error</div>;
    }
    
  return ( 
  <div className='mt-8'>
    <Filter data={dataFilter} paramsPatient={paramsPatient} setParamsPatient={setParamsPatient} />

    <div className='flex  flex-wrap gap-8'>
      {
          data?.data.map(  (i : any) => (
              <div className="inline-block max-w-[360px] w-full mt-8 mr-8 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4 mb-4  w-full">
                    <div className="flex-shrink-0">
                      <img className='w-20 h-20 object-cover rounded-2xl' src={IPLocal  + i.User?.img} alt={IPLocal + "/" + i.User?.img} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900"> {i.User?.nom}</h3>
                        <h3 className=" font-bold text-gray-900">{i.User?.prenom} </h3>
                        <div className='w-full flex justify-between'>
                            <span>{i?.Classe?.nom}</span>
                        </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center border-t pt-2">
                      <span className="font-medium">Genre:</span>
                      <span>{i.sex}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                      <span className="font-medium">Téléphone:</span>
                      <span>{i.phone}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                      <span className="font-medium">Email:</span>
                      <span className="truncate">{i.User?.email}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                      <span className="font-medium">Statut:</span>
                      <span>{i.status}</span>
                  </div>
                  <p className="mt-4">
                      <BiEdit onClick={() => navigate(`/admin/${query}/edit/${i.id}`)} className="inline-block mr-4 text-2xl" />
                      <MdDelete onClick={() => setShow({ id: i.id, show: true })} className="inline-block text-2xl" />
                  </p>
                     
                  </div>
              </div>
        ))}
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
    {data && <Pagination   paramsPatient={paramsPatient} totalPage={data?.totalPages} setParamsPatient={setParamsPatient}/>}
  </div>
)}