type Props = {
    title : string
}

export default function TitleForm({title}: Props) {
  return (
        <h1 className="text center  text-3xl  font-medium">{title} </h1>
  )
}