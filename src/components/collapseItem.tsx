import Link from 'next/link'
import React, { useState } from 'react'

interface Props {
    id: number
    listName: string
    tabIndex: number
    toDos: Array<string>
    reload: () => void
}

const CollapseItem = ({ id, listName, tabIndex, toDos, reload }: Props) => {

    const [collapse, setCollapse] = useState("collapse collapse-close collapse-arrow border border-base-300 bg-base-100 rounded-box w-10/12 mt-4");
    const [isOpen, setIsOpen] = useState(false);

    const [popUpHidden, setPopUpHidden] = useState("hidden");

    const toggleCollapse = () => {
        if (isOpen == false) {
            setCollapse("collapse collapse-open collapse-arrow border border-base-300 bg-base-100 rounded-box w-10/12 mt-4");
            setIsOpen(true)
        } else {
            setCollapse("collapse collapse-close collapse-arrow border border-base-300 bg-base-100 rounded-box w-10/12 mt-4");
            setIsOpen(false)
        }  
    }

    const deleteList = async () => {
        const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists/" + id, {
            method: "DELETE"
        })
        const data = await res.json();
        reload();
    }

  return (
    <>

        <div className={"card w-96 h-min bg-neutral text-neutral-content absolute z-50 top-0 left-0 bottom-0 right-0 m-auto " + popUpHidden}>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Are you sure?</h2>
                <p>This will delete the list item with all of its toDo items!</p>
                <div className="card-actions justify-end">
                <button onClick={deleteList} className="btn btn-primary">Delete</button>
                <button onClick={() => {setPopUpHidden("hidden")}} className="btn btn-primary">Cancel</button>
                </div>
            </div>
        </div>

        <div tabIndex={tabIndex} className={collapse}>
            <div onClick={toggleCollapse} className="collapse-title text-xl font-medium bg-base-300">
                {listName}
            </div>
            <div className="collapse-content overflow-scroll">

                {toDos.map((toDo: string, index) => {
                    return <label key={index} className="label cursor-pointer justify-start items-start">
                                <input type="checkbox" className="checkbox checkbox-primary mr-4 border-2" />
                                <span className="">{toDo}</span>
                            </label>
                    })}

                <div className='w-full flex justify-center h-content mt-4'>
                    <Link href={"/lists/" + id}><button className="btn btn-primary mr-1">OPEN</button></Link>
                    <button onClick={() => {setPopUpHidden("")}} className="btn btn-primary ml-1">DELETE</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default CollapseItem
