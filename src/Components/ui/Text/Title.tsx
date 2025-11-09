

type Props = {
    title : string
}

export default function Title({title}: Props) {
  return (
    <h1 className="font-bold text-2xl text-center text-[var(--white)] bg-[var(--color-primary)] p-4 ">
        {title}
    </h1>
  )
}