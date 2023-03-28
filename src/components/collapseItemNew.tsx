import React, { useState } from 'react'
import { BsPlusSquareFill } from 'react-icons/bs';
import { useRouter } from 'next/router'

interface Props {
    hidden: string
    hide: () => void
    reload: () => void
}

const CollapseItemNew = ({ hidden, hide, reload }: Props) => {

    const router = useRouter()

    const [collapse, setCollapse] = useState("collapse collapse-open collapse-arrow border border-base-300 bg-base-100 rounded-box w-10/12 mt-4");
    const [isOpen, setIsOpen] = useState(false);

    const [listName, setListName] = useState("");
    const [toDo, setToDo] = useState("");

    const toggleCollapse = () => {
        //mark red not filled in fields and add some animation
    }

    const discardClick = () => {
        setToDo("");
        setListName("");
        hide();
    }

    const toDoChange = (e: React.FormEvent<HTMLInputElement>) => {
        setToDo(e.currentTarget.value);
    }

    const listNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setListName(e.currentTarget.value);
    }

    const submitApi = async () => {
        const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists", {
            method: "POST",
            body: JSON.stringify({"name": listName, "todos": [toDo]}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();

        const resItem = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items", {
            method: "POST",
            body: JSON.stringify({"name": toDo, "deadline": NaN, "listReferenceId": data.id.toString()}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const dataItem = await resItem.json();

        reload();
    }

  return (
    <div tabIndex={1} className={collapse + " " + hidden}>
        <div onClick={toggleCollapse} className="collapse-title text-xl font-medium bg-base-300">
            <input onChange={listNameChange} value={listName} type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="collapse-content overflow-scroll">
                {/* Add here functionality if user starts typing in first to do automatically display second to do */}
                <label className="label cursor-pointer justify-start items-center">
                    <input type="checkbox" className="checkbox checkbox-primary mr-4 border-2" />
                    <input onChange={toDoChange} value={toDo} type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
                </label>
            <div className='w-full flex justify-center h-content mt-4'>
                <button onClick={submitApi} className="btn btn-primary mr-1">SAVE</button>
                <button onClick={discardClick} className="btn btn-primary ml-1">DISCARD</button>
            </div>
        </div>
    </div>
  )
}

export default CollapseItemNew
