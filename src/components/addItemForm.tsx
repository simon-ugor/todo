import React from 'react'

interface Props {
    hidden: string
    close: () => void
}

const AddItemForm = ({ hidden, close }: Props) => {
  return (
    <div className={'absolute top-0 left-0 right-0 bottom-0 m-auto w-10/12 h-5/6 bg-white rounded-xl ' + hidden}>
        <button onClick={close} className="btn btn-primary">OPEN</button>
    </div>
  )
}

export default AddItemForm
