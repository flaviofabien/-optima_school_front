import { Link } from "react-router-dom"

type Props = {
    text : string
    link : string
    style ?: number
}

export default function ButtonLink({link,text,style}: Props) {
  return (
    <Link 
     className={`
    rounded-xl cursor-pointer 
     ${style === undefined && "py-2 px-8  bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] "}
     ${style === 1 && "py-2 px-8  bg-gray-200 text-gray-800"}
     ${style === 2 && "py-2 px-8  bg-[var(--color-primary-transparent)] text-white "}
     ${style === 3 && "text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"}
     `}
    to={link}> {text} </Link>
  )
}