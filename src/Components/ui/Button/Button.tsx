type Props = {
    text : string
    type : "submit" | "reset" | "button" | undefined
    style ?: number
    onClick ?: React.MouseEventHandler<HTMLButtonElement> | undefined
}
export default function Button({text,type,style,onClick}: Props) {

  return (
    <button onClick={onClick}  className={`
      mt-8 rounded-xl cursor-pointer 
      ${style === undefined && "py-2 px-8  bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] "}
      ${style === 1 && "py-2 px-8  bg-gray-200 text-gray-800"}
      ${style === 2 && "py-2 px-8  bg-[var(--color-primary-transparent)] text-white "}
      ${style === 3 && "text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"}
      `} type={type}>
        {text}
    </button>
  )
}