"use client"
import React, { useEffect, useState } from 'react'
import WorkSpaceHeader from '../_components/WorkSpaceHeader'
import Editor from '../_components/Editor'
import Canvas from '../_components/Canvas'
import { useConvex } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { useParams } from 'next/navigation'
import { FILE } from '../../dashboard/_components/SideBar'

function Workspace() {
  const params = useParams<any>();
  const [trigger, setTrigger] = useState<boolean>(false)
  const [ fileData , setFileData ] = useState<FILE>()
  const convex = useConvex();

  const getSaveData = async() =>{
    const res = await convex.query(api.Files.getSaveDocument , { _id :params.fileId})
    setFileData(res)
  }

  useEffect(() => {
    params && getSaveData();
  }, [])


  return (
    <div>
      <WorkSpaceHeader onSave={() => setTrigger(!trigger)} fileData={fileData} />
      <div className='flex sm:flex-row md:flex-row flex-col  h-[93vh]'>
        {/* { workspace Editor} */}
        <div className=' basis-[26%] border-b-2 border-r '>
          <Editor trigger={trigger} fileId={params.fileId} fileData={fileData}/>
        </div>

        {/* {Canvas workspace} */}
        <div className='basis-[74%]'>
        <Canvas />
        </div>
      </div>


    </div>
  )
}

export default Workspace
