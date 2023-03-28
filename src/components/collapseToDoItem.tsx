import React from 'react'
import { useState } from 'react';

interface ToDoItem {
    toDoTitle: string
    toDoText: string
    deadline: string
}

const CollapseToDoItem = ({ toDoTitle, toDoText, deadline }: ToDoItem) => {

    const [collapse, setCollapse] = useState("collapse collapse-close collapse-arrow border border-primary bg-primary rounded-box w-10/12 mt-2");
    const [isOpen, setIsOpen] = useState(false);

    const deadlineDate = new Date(deadline);

    const toggleCollapse = () => {
        if (isOpen == false) {
            setCollapse("collapse collapse-open collapse-arrow border border-base-300 bg-primary rounded-box w-10/12 mt-2");
            setIsOpen(true)
        } else {
            setCollapse("collapse collapse-close collapse-arrow border border-base-300 bg-primary rounded-box w-10/12 mt-2");
            setIsOpen(false)
        }  
    }

  return (
    <div tabIndex={0} className={collapse}>
        <div onClick={toggleCollapse} className="collapse-title text-xl font-medium bg-primary-focus">
            {toDoTitle}
        </div>
        <div className="collapse-content overflow-scroll">
            
            <p>{toDoText}</p>
            <p>{deadlineDate.getDate().toString() + "-" + deadlineDate.getMonth().toString() + "-" + deadlineDate.getFullYear().toString()}</p>

            <div className='w-full flex justify-center h-content mt-4'>
                <button className="btn bg-base-300 ml-1">DELETE</button>
            </div>
        </div>
    </div>
  )
}

export default CollapseToDoItem
