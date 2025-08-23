import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import type { userType } from '../../../typescript/Users'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CardConfirmDelete from '../Card/CardConfirmDelete'

type Props = {
    items : userType
}

export default function TableData({items}: Props) {
    const [show,setShow] = useState({
        show : false,
        id : NaN
    })
    const navigate = useNavigate()
  return (
    <tr className="w-96 border-b-2 border-[var(--color-primary-transparent)] bg-[var(--white)]">
        <td className="px-6 py-4 ">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-color-base transition duration-150 ease-in-out" />
        </td>
        <td className="px-6 py-4 ">
            {items.nom} {items.prenom}
        </td>
        <td className="px-6 py-4 ">
            {items.email}
        </td>
        <td className="px-6 py-4 ">
            {items.role}
        </td>
        <td className="px-6 py-4 ">
            <BiEdit onClick={ () => navigate(`/admin/users/edit/${items.id}`) } className="inline-block mr-4 text-xl" />
            <MdDelete onClick={ () => setShow({id : items.id , show : true}) }  className="inline-block text-xl"  />
        </td>
        {
            show.show && <CardConfirmDelete show={show} setShow={setShow}  title='Utilisateurs' fullName={` ${items.nom} ${items.prenom} `} />
        }
    </tr> 
  )
}