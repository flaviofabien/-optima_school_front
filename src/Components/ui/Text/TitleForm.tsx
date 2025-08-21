type Props = {
    title : string
}

export default function TitleForm({title}: Props) {
  return (
    <div className=" w-68 lg:w-[500px] bg-[var(--color-primary)] p-4 rounded-b-[42px] rounded-t-xl absolute -top-8">
        <h1 className="tect center text-white text-xl p-4 text-center font-semibold">{title} </h1>
    </div>
  )
}