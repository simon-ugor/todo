import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import CollapseToDoItem from '@/components/collapseToDoItem'
import Navbar from '@/components/navbar';
import CollapseToDoItemNew from '@/components/collapseToDoItemNew';
import { useRouter } from 'next/router'
import { AiOutlineMinusCircle } from 'react-icons/ai';
import DeleteWarning from '@/components/deleteWarning';

export const getStaticProps = async () => {
    const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists");
    const data = await res.json();
    return {
        props: { lists: data }
    };
}

interface List {
    id: number
    name: string
}
  
interface HomeProps {
    lists: Array<List>
}

interface Item {
    id: string
    listReferenceId: string
    name: string
    description: string
    deadline: string
}

const zoznamy = ({ lists }: HomeProps) => {

    useEffect(() => {

        fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items")
        .then(res => res.json())
        .then(data => setToDoItems([...data]))

    }, []);

    const router = useRouter();

    const [listName, setListName] = useState({"name": lists[0].name, "id": lists[0].id.toString()});
    const [listChosen, setListChosen] = useState(false);
    const [ulHidden, setUlHidden] = useState("hidden");
    const [toggleNewList, setToggleNewList] = useState({"button": "", "input": "hidden"});
    const [newListName, setNewListName] = useState("");
    const [newToDoHidden, setNewToDoHidden] = useState("hidden");
    const [deleteWarningHidden, setDeleteWarningHidden] = useState("hidden")
    const [listIdToDelete, setListIdToDelete] = useState("");

    const [toDoItems, setToDoItems] = useState<Item[]>([])

    const listSwitch = (e: React.FormEvent<HTMLButtonElement>) => {
        setListName({"name": e.currentTarget.value, "id": e.currentTarget.id.toString()});
        setUlHidden("hidden");
        fetchItems(e.currentTarget.id);
    }

    const deleteList = (e: React.FormEvent<HTMLButtonElement>) => {
        setListIdToDelete(e.currentTarget.id);
        setUlHidden("hidden");
        setDeleteWarningHidden("");
    }

    const deleteListApi = async (id: string) => {

        const resList = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists/" + id, {
            method: "DELETE"
        })
        const dataList = await resList.json();

        let itemsToDelete: Item[] = []

        toDoItems.map((item) => {
            if (item.listReferenceId == id) {
                itemsToDelete.push(item)
            }
        })
        
        for (let i = 0; i < itemsToDelete.length; i++) {
            const resItem = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items/" + itemsToDelete[i].id, {
                method: "DELETE"
            })
            const dataItem = await resItem.json()
        }

        //replace this by just using state and not this thing
        router.reload();
    }

    const cancelDelete = () => {
        setDeleteWarningHidden("hidden");
    }

    const fetchItems = async (id: string) => {
        const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items");
        const data = await res.json();

        let currentItems: Item[] = []

        data.map((item: Item) => {
            if (item.listReferenceId == id) {
                currentItems.push(item)
            }
        })

        setToDoItems([...currentItems])
        setListChosen(true);

    }

    const toggleHidden = () => {
        if (ulHidden == "hidden") {
            setUlHidden("");
        } else {
            setUlHidden("hidden");
            setToggleNewList({"button": "", "input": "hidden"})
        }
    }

    const toggleNewListButton = () => {
        if (toggleNewList.button == "") {
            setToggleNewList({"button": "hidden", "input": ""})
        }
    }

    const submitNewList = async () => {
        const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists", {
            method: "POST",
            body: JSON.stringify({"name": newListName}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        router.reload();
    }

    const hideNewToDo = () => {
        setNewToDoHidden("hidden");
    }

  return (
    <>
        <Head>
            <title>ToDo App</title>
            <meta name="description" content="ToDo web application" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <DeleteWarning hidden={deleteWarningHidden} cancelClick={cancelDelete} deleteClick={deleteListApi} idToDelete={listIdToDelete} />

        <div className='grid grid-rows-5 h-screen w-full bg-neutral-content'>
            <Navbar />
            <div className="navbar bg-base-300 rounded-box w-11/12 m-auto">
                <div className="flex-1 px-2 lg:flex-none">
                    <a className="text-lg font-bold">{listName.name}</a>
                </div> 
                <div className="flex justify-end flex-1 px-2">
                    <div className="flex items-stretch">
                        <div className="dropdown dropdown-end dropdown-open">
                            <button onClick={toggleHidden} className="btn btn-primary rounded-btn">&#x2193;</button>
                            <ul tabIndex={0} className={"menu dropdown-content p-2 shadow bg-base-100 rounded-box w-64 mt-4 " + ulHidden}>
                                {lists.map((list) => {
                                    return <li className='border-b-2 border-neutral-content w-full flex flex-row justify-between items-center' key={list.id}>
                                                <button className='w-9/12 h-min' onClick={listSwitch} value={list.name} id={list.id.toString()}>{list.name}</button>
                                                <button className='w-3/12 h-min' onClick={deleteList} id={list.id.toString()}><AiOutlineMinusCircle className='text-red-500 m-auto' /></button>
                                            </li>
                                })} 
                                <li>
                                    <button onClick={toggleNewListButton} className={"btn btn-primary w-full mt-3 " + toggleNewList.button}>Nový zoznam</button>
                                    <div className={'w-full ' + toggleNewList.input}>
                                        <input onChange={(e) => {setNewListName(e.currentTarget.value)}} type="text" placeholder="Názov zoznamu" className="input input-bordered w-full max-w-xs" />
                                        <button onClick={submitNewList} className="btn btn-primary w-min">+</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-start hidden'>
                <input type="text" placeholder="Search toDo" className="input w-11/12" />
            </div>
            <div className='w-full h-min flex flex-col items-center overflow-scroll'>
                {
                    toDoItems.length > 0 ?
                    toDoItems.map((item: Item) => {
                        if (listChosen == false && item.listReferenceId == lists[0].id.toString()) {
                            return <CollapseToDoItem key={item.id} toDoTitle={item.name} toDoText={item.description} deadline={item.deadline} />
                        } else if (listChosen == true) {
                            return <CollapseToDoItem key={item.id} toDoTitle={item.name} toDoText={item.description} deadline={item.deadline} />
                        }
                    })
                    : <p className='text-primary-content'>Zatiaľ neboli pridané žiadne ToDos</p>
                }
                <CollapseToDoItemNew hidden={newToDoHidden} hide={hideNewToDo} referenceId={listName.id} />
                <button onClick={() => {setNewToDoHidden("")}} className="btn btn-primary mt-4">Pridať ToDo</button>
            </div>
        </div>
    </>
  )
}

export default zoznamy
