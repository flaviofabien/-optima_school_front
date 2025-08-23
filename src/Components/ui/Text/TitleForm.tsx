type Props = {
    title : string
    title2 ?: string
}

export default function TitleForm({title,title2}: Props) {
  return (
    <div className=" w-68 lg:w-[500px] bg-[var(--color-primary)] p-4 rounded-b-[42px] rounded-t-xl absolute -top-8">
        <h1 className="tect center text-white text-xl p-4 text-center font-semibold">{title} </h1>
        {title2 && <h2 className="tect center text-white p-2 text-center ">{title2} </h2>}  
    </div>
  )
}