
type Props = {
    data : any
    dataInclude : any
    setrDataInclude :  any
}

export default function MenuLinkButton({data,dataInclude,setrDataInclude}: Props) {
    const HandleButton = (id : number ,event : any) => {
        if (event === "ecole") {
            setrDataInclude({
                ecole :  { id:id , status:true },
                niveau :  { id:id ,  status:false } ,
                classe :  { id:id , status:false },
                salle :  { id:id , status:false },
            })
        }else if (event === "niveau") {
            setrDataInclude( (prev : any) => ( {...prev , 
                niveau :  { id:id ,  status:true } ,
                classe :  { id:id , status:false },
                salle :  { id:id , status:false },
        }))
        }else if (event === "classe") {
            setrDataInclude( (prev : any) => ( {...prev ,  
                classe :  { id:id , status:true },
                salle :  { id:id , status:false },
        }))
        }else if (event === "salle") {
            setrDataInclude( (prev : any) => ( {...prev , 
                salle :  { id:id , status:true }
        }))
        }
      }
    
  return (
    <div className="w-full bg-white p-4 flex mt-8 rounded-xl">
    <div className=" w-1/4">
        <h2>Ecole</h2>
        <div className=" flex flex-col justify-start items-start">
        {
            data?.ecole.map((e : any) => {
                const isActive = (e.id === dataInclude.ecole.id) && (dataInclude.ecole.status) ; 
                return <button className= {` mt-4 px-4 py-2 rounded-md  ${ isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"ecole")}> {e.nom} </button>
            }  
             )
        }
        </div>
    </div>
    {
        dataInclude.ecole.status && 
            <div className="w-1/4">
                <h2>Niveau</h2>
                <div className=" flex flex-col justify-start items-start">
                {
                    data?.niveau.filter( (i : any) =>  i.ecoles?.map( (um : any) =>  um.id ).includes(dataInclude.ecole.id) ).map((e : any) => {
                        const isActive = (e.id === dataInclude.niveau.id) && (dataInclude.niveau.status) ; 
                        return <button className= {` mt-4 px-4 py-2 rounded-md  ${isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"niveau")}> {e.nom} </button>
                    }   )
                }
                </div>
            </div>
    }
    {
        dataInclude.niveau.status && 
            <div className="w-1/4">
                <h2>Classe</h2>
                <div className=" flex flex-col justify-start items-start">
                {
                    data?.classe.filter( (i : any) =>  (i.idNiveau == dataInclude.niveau.id && i.idEcole == dataInclude.ecole.id) ).map((e : any) => {
                        const isActive = (e.id === dataInclude.classe.id) && (dataInclude.classe.status) ; 
                        return <button className= {` mt-4 px-4 py-2 rounded-md  ${isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"classe")}> {e.nom} </button>
                    }    )
                }
                </div>
            </div>
    }
    {
        dataInclude.classe.status && 
            <div className="w-1/4">
                <h2>Salle</h2>
                <div className=" flex flex-col justify-start items-start">
                {
                    data?.salle.filter( (i : any) => i.idClasse == dataInclude.classe.id ).map((e : any) => {
                        const isActive = (e.id === dataInclude.salle.id) && (dataInclude.salle.status) ; 
                        return <button className= {` mt-4 px-4 py-2 rounded-md  ${isActive ? " bg-[var(--color-primary)] text-white " : "bg-gray-200" }  `}  type="button" onClick={ () => HandleButton(e.id,"salle")}> {e.nom} </button>
                    }    )
                }
                </div>
            </div>
    }
</div>
  )
}