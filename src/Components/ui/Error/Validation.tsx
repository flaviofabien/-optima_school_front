type Props = {
    errorServer : string
}

export default function Validation({errorServer}: Props) {
  return (
    <p className="bg-red-200 text-red-600 w-full text-sm  text-center p-2 my-2"> {errorServer} </p>
  )
}