import CollapseItem from '@/components/collapseItem'
import CollapseItemNew from '@/components/collapseItemNew'
import Head from 'next/head'
import { useState } from 'react';
import { BsPlusSquareFill } from 'react-icons/bs';
import { useRouter } from 'next/router'

export const getStaticProps = async () => {
  const res = await fetch("https://641fa343ad55ae01ccbf4798.mockapi.io/api/v/lists");
  const data = await res.json();
  return {
      props: { lists: data }
  };
}

interface IItem {
  id: number
  name: string
  todos: Array<string>
}

interface HomeProps {
  lists: Array<IItem>
}


export default function Home({ lists }: HomeProps) {

  const [hidden, setHidden] = useState("hidden");

  const router = useRouter();

  const addList = () => {
    setHidden("");
  }

  const hide = () => {
    setHidden("hidden");
  }

  const reload = () => {
    router.reload();
  }

  return (
    <>
      <Head>
        <title>ToDo App</title>
        <meta name="description" content="ToDo web application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-rows-4 h-screen w-full'>
        <div className='flex justify-center items-center border-b-2 border-b-black'>
          <h1 className='text-4xl text-black'>ToDo App</h1>
        </div>
        <div className='flex justify-between items-center w-10/12 mx-auto'>
          <h2 className='text-2xl text-base-300'>Zoznamy</h2>
          <BsPlusSquareFill onClick={addList} className='h-2/6 w-min text-base-300' />
        </div>
        <div className='w-full flex flex-col items-center overflow-scroll'>
            {lists.map((list: IItem, index) => {
                    return <CollapseItem tabIndex={index} key={index} listName={list.name} toDos={list.todos} id={list.id} reload={reload} />
            })}
            <CollapseItemNew hidden={hidden} hide={hide} reload={reload} />
        </div>
        <div className='flex justify-center items-center'>
          <h3 className='text-l text-red-100'>Šimon Ugor pre AMCEF</h3>
        </div>
      </div>
    </>
  )
}
