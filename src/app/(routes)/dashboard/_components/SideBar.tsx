import React, { useContext, useEffect, useState } from 'react'
import SideBarTop from './SideBarTop'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideBarBottom from './SideBarBottom';
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';
import { FileListContext } from '@/app/_context/FileListContext';

export interface FILE {
  _id: string;
  fileName: string;
  createdBy: string;
  archived: boolean;
  documents: string;
  whiteBoard: string;
 _creationTime:string,
}
function SideBar() {
  const { user }: any = useKindeBrowserClient();
  const [ fileId , setFileId] = useState<FILE | any>(undefined) // for file id
  const [totalFile , setTotalFile] = useState<Number>()// for total file
  const createFile = useMutation(api.Files.createFile);
  const { _FileList , setFileList } = useContext(FileListContext); // context for retrive props
  const convex = useConvex();

  const handleClick = async(fileName:string) =>{ //  when user is click then create the File 
    createFile({
      fileId : fileId._id,
      fileName :fileName,
      createdBy :user?.email,
      archived:false,
      documents:"",
      whiteBoard:"",
    }).then((res) => {
      if(res){
        getFile();
        toast("File Created Successfully")
      }
    }).catch(err => console.log(err || "error occured"))
  }

  const getFile = async() =>{ // getting all files 
    const res = await convex.query(api.Files.getFile , { fileId : fileId._id})
    setTotalFile(res?.length)
    setFileList(res)
  }

  useEffect(() => {
    fileId && getFile();
  } , [fileId])

  return (
    <div className='w-72 bg-[#FFFFFF] border-r h-screen flex flex-col '>
      <div className='flex-1'>
        <SideBarTop user={user} getActiveTeamId={(activeTeam:FILE) =>setFileId(activeTeam) }/>
      </div>

      <div>
        <SideBarBottom handleClick={handleClick} totalFile={totalFile}/>
      </div>
    </div>
  )
}

export default SideBar
