import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CardConfirmDelete from '../../Card/CardConfirmDelete'
import { DeleteStudents } from '../../../../api/Student'
import type { TeachType } from '../../../../typescript/Teach'
import { DeleteTeachs } from '../../../../api/Teach'

type Props = {
    items : TeachType
}

export default function TableTeachData({items}: Props) {
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
            {items.User?.nom} {items.User?.prenom}
        </td>
        <td className="px-6 py-4 ">
            {items.sex}
        </td>
        <td className="px-6 py-4 ">
            {items.address}
        </td>
        <td className="px-6 py-4 ">
            {items.phone}
        </td>
        <td className="px-6 py-4 ">
            {items.specialite}
        </td>
        <td className="px-6 py-4 ">
            {items.status}
        </td>
        <td className="px-6 py-4 ">
            <BiEdit onClick={ () => navigate(`/admin/teachs/edit/${items.id}`) } className="inline-block mr-4 text-xl" />
            <MdDelete onClick={ () => setShow({id : items.id , show : true}) }  className="inline-block text-xl"  />
        </td>
        {
            show.show && <CardConfirmDelete navigate={'/admin/teachs'} functionMutation={DeleteTeachs} show={show} setShow={setShow}  title='Enseignant' fullName={` ${items.User?.nom} ${items.User?.prenom} `} />
        }
    </tr> 
  )
}