import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { FormDataUserType } from "../../../Zod-Validation/Users"
import { DeleteUsers } from "../../../api/Users"
import type { ErrorServerForm } from "../../../typescript/ErrorServer"
import Button from "../Button/Button"
import Description from "../Text/Description"
import Title from "../Text/Title"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../../store/store"

type Props = {
    title : string
    fullName : string
    show : {
        show: boolean;
        id: number;
    }
    setShow :  React.Dispatch<React.SetStateAction<{
        show: boolean;
        id: number;
    }>>
}

export default function CardConfirmDelete({show,setShow,title,fullName}: Props) {
    const token = useSelector((state: RootState) => state.dataStorage.token);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(
        {
        mutationFn: (id : number) => DeleteUsers(id ,token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            navigate("/admin/users"); 
        },
    });

    const HandleDelete = (id : number) => {
        mutation.mutate(id)
        setShow({id : NaN, show : false}) 
    }

    return (
        <div className='h-screen w-full flex justify-center items-center fixed bg-[var(--color-primary-transparent)] backdrop-blur-sm  top-0 left-0'>
            <div className="w-[400px] bg-white">
                <Title title={title}  />
                <br />
                <Description align="center" text={`Vous voulez vraiment supprimer ${fullName}  `} />
                <div className="px-4 pb-8 flex justify-between w-full items-center">
                    <Button onClick={ () =>  HandleDelete(show.id) } type="button" text="Oui" style={1} />
                    <Button onClick={ () => setShow({
                        id : NaN, show : false
                    }) } type="button" text="Non"  />
                </div>
            </div>
        </div>
    )
}