type Props = {
    text : string
    align : string
}

export default function Description({text,align}: Props) {
  return (
    <p className={`text-${align} text-sm`} > {text} </p>
  )
}