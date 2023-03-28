import React, { useState } from 'react'
import Head from 'next/head'
import { BsPlusSquareFill } from 'react-icons/bs';
import AddItemForm from '@/components/addItemForm';
import CollapseToDoItem from '@/components/collapseToDoItem';

interface List {
  id: number
  name: string
}

type Item = {
  name: string
  relatedListName: string
  relatedListId: number
  description: string
  deadline: string
}

export const getStaticPaths = async () => {
  const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists");
  const data = await res.json();

  const paths = data.map((list:List) => {
    return {
      params: { id:list.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/items");
  const data = await res.json();
  
  const correctItems = []
  data.map((item) => {
    if (item.listReferenceId == id) {
      correctItems.push(item);
    }
  })

  return {
    props: { itemsProps: correctItems }
  }
}

const List = ({ itemsProps }) => {



  //console.log(itemsProps)

  const [hidden, setHidden] = useState("hidden");

  const addItem = () => {
    if (hidden == "hidden") {
      setHidden("");
    } else {
      setHidden("hidden");
    }
  }

  return (
    <>
      <Head>
        <title>ToDo App</title>
        <meta name="description" content="ToDo web application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddItemForm hidden={hidden} close={addItem} />
      <div className='grid grid-rows-4 h-screen w-full'>
        <div className='flex justify-center items-center border-b-2 border-b-black'>
          <h1 className='text-4xl text-black'>ToDo App</h1>
        </div>
        <div className='flex justify-between items-center w-10/12 mx-auto'>
          <h2 className='text-2xl text-base-300'>{"name of list will be here"}</h2>
          <BsPlusSquareFill onClick={addItem} className='h-2/6 w-min text-primary' />
        </div>
        <div className='w-full flex flex-col items-center overflow-scroll'>
          <div className='w-full'>
            <div className='w-full flex flex-col items-center overflow-scroll'>
              {itemsProps.map((item: Item, index: number) => {
                return <CollapseToDoItem key={index} toDoTitle={item.name} toDoText={item.description} deadline={item.deadline} />
              })}
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <h3 className='text-l text-base-300'>Šimon Ugor pre AMCEF</h3>
        </div>
      </div>
    </>
  )
}

export default List
