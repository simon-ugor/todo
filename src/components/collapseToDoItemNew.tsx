import React from 'react'
import { useState } from 'react';

interface Props {
    hidden: string
    referenceId: string
    hide: () => void
}

const CollapseToDoItemNew = ({ hidden, hide, referenceId }: Props) => {

    const [collapse, setCollapse] = useState("collapse collapse-open collapse-arrow border border-base-300 bg-base-100 rounded-box w-10/12 mt-4");

    const [toDoName, setToDoName] = useState("");
    const [toDoDescription, setToDoDescription] = useState("");

    const submitApi = async () => {
        const resItem = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items", {
            method: "POST",
            body: JSON.stringify({"name": toDoName, "deadline": "2023-05-01", "listReferenceId": referenceId, "description": toDoDescription}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const dataItem = await resItem.json();
        console.log(dataItem);
    }

    const discardClick = () => {
        setToDoName("");
        setToDoDescription("");
        hide();
    }

    const toDoNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setToDoName(e.currentTarget.value);
    }

    const descriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
        setToDoDescription(e.currentTarget.value);
    }

  return (
    <div tabIndex={1} className={collapse + " " + hidden}>
        <div className="collapse-title text-xl font-medium bg-primary-focus">
            <input onChange={toDoNameChange} value={toDoName} type="text" placeholder="Type here" className="input border-0 w-full max-w-xs" />
        </div>
        <div className="collapse-content overflow-scroll bg-primary">
                {/* Add here functionality if user starts typing in first to do automatically display second to do */}
                <label className="label cursor-pointer justify-start items-center">
                    <input onChange={descriptionChange} value={toDoDescription} type="text" placeholder="Type here" className="input border-0 w-full max-w-xs" />
                </label>
            <div className='w-full flex justify-center h-content mt-4'>
                <button onClick={submitApi} className="btn btn-primary bg-base-100 mr-1">SAVE</button>
                <button onClick={discardClick} className="btn btn-primary bg-base-100 ml-1">DISCARD</button>
            </div>
        </div>
    </div>
  )
}

export default CollapseToDoItemNew
