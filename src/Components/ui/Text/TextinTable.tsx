type Props = {
    text : string
}

export default function TextHeaderTable({text}: Props) {
  return (
    <h1 className="text-2xl font-bold"> {text} </h1>
  )
}