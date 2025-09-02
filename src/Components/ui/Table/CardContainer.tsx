import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardConfirmDelete from '../Card/CardConfirmDelete';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';

type Props = {
    FnQueryGet: (token: string) => Promise<any[]>;
    query : string
    title : string
    functionMutation :  (id: number, token: string) => void;
  };
export default function CardContainer({   FnQueryGet , query ,title , functionMutation  }: Props) {
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
  <>
  {
      data?.map( i => (
          <div className="inline-block max-w-96 lg:ml-60 mt-8 mr-8 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-4 ">
              <div className="flex-shrink-0">
                  <svg className="h-12 w-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.261 2.358 11.996 5.993zM12 13C6.477 13 2 8.523 2 3S6.477 0 12 0s10 4.477 10 9-4.477 10-10 10z" />
                  </svg>
              </div>
              <div>
                  <h3 className="text-xl font-bold text-gray-900">{i.prenom} {i.nom}</h3>
                  <p className="text-sm text-gray-500">{i.matricule}</p>
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
                  <span className="truncate">{i.email}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-2">
                  <span className="font-medium">Statut:</span>
                  <span>{i.status}</span>
              </div>
              <p className="px-6 py-4">
                      <BiEdit onClick={() => navigate(`/admin/${query}/edit/${item.id}`)} className="inline-block mr-4 text-xl" />
                      <MdDelete onClick={() => setShow({ id: item.id, show: true })} className="inline-block text-xl" />
                  </p>
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
              </div>
          </div>
  
      ) )
  }
  </>
)}