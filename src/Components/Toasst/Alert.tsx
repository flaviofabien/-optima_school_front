
type Props = {
    title: string
    description : string
}

export default function AlertSuccess({title,description}: Props) {
  return (
    <div className='border-4 border-[var(--color-success)] w-80 bg-white'>
        <h1 className='text-white bg-[var(--color-success)] p-2 text-center '> {title} </h1> 
        <div className='my-4 text-center  '>
            <p className='text-sm'> {description} </p>
        </div>
    </div>
  )
}