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
import type { EcoleData } from '../../../typescript/Ecole';
import Loading from '../Loader/Loading';

type Props = {
    FnQueryGet: (
      token: string,
      limit: number,
      page: number,
      sortBy: string,
      order: string,
      search: string) => Promise<any>;
    query : string
    title : string
    functionMutation :  (id: number, token: string) => Promise<any>  ;
    dataFilterSelect : any
};

export default function EcoleCardContainer({   FnQueryGet , query ,title , functionMutation ,dataFilterSelect }: Props) {
  const token = useSelector((state: RootState) => state.dataStorage.token);
  const navigate = useNavigate();
 
  const [paramsPatient, setParamsPatient] = useState({
    limit: 3,
    page: 1,
    sortBy:  "nom",
    order: "desc",
    search: ""
    });


  const {data,isLoading,isError} = useQuery<EcoleData> (
  {
    queryKey : [query,token,paramsPatient.page,paramsPatient.limit,paramsPatient.search,paramsPatient.order,paramsPatient.sortBy] ,
    queryFn : () =>  FnQueryGet(token! , paramsPatient.page!,paramsPatient.limit!,paramsPatient.search!,paramsPatient.order!,paramsPatient.sortBy!)
  })
  
  const [show, setShow] = useState({
    show: false,
    id: NaN
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;
    
  console.log(paramsPatient,"Parent");

  return ( 
  <div className=' w-full lg:pl-60 pt-8 pr-8  '>
        <Filter data={dataFilterSelect} paramsPatient={paramsPatient} setParamsPatient={setParamsPatient} />
        <div className='flex flex-wrap gap-8 '>
          {
              data?.data.map( i => (
                  <div className="flex flex-col gap-2  w-full max-w-[290px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                      <div className="w-full">
                          <img className='w-full h-60 object-cover rounded-t-2xl' src={IPLocal  + i.img} alt={IPLocal + "/" + i.img} />
                      </div>

                      <div className=" mb-4 w-full p-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900"> {i.nom}</h3>
                        </div>

                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="flex justify-between items-center border-t pt-2">
                          {  
                            i?.type.map( p => (
                              <span>
                                  {p}      
                              </span>
                          ))}
                          </div>
                          <div className="flex justify-between items-center border-t pt-2">
                              <span className="font-medium">Adresse:</span>
                              <span>{i.adresse}</span>
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
        {data && <Pagination   paramsPatient={paramsPatient} totalPage={data?.totalPages} setParamsPatient={setParamsPatient}/>}

  </div>
)}