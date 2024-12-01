import { FileListContext } from '@/app/_context/FileListContext'
import React, { useContext, useEffect, useState } from 'react'
import { FILE } from './SideBar'
import moment from 'moment'
import { Archive, Ellipsis } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const FileList = ({ user }: any) => {
  const { _FileList, setFileList } = useContext(FileListContext)
  const navigate = useRouter();
  const [fileData, setFileData] = useState<FILE[]>()

  useEffect(() => {
    _FileList && setFileData(_FileList);
  }, [_FileList])

  if(!fileData){
    return <p className='text-2xl h-[70vh] font-bold flex justify-center items-center'>Loading Files ...</p>
  }


  return (
    <div className='p-4'>

      <div className="overflow-x-auto mt-14">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Name</td>
              <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900"> Created At</td>
              <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Edited</td>
              <td className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Author</td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {
              fileData && fileData.map((curr, i) => (
                <tr key={i} className="odd:bg-gray-50 cursor-pointer"
                onClick={() => navigate.push("/workspace/"+curr._id)}
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{curr.fileName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(curr._creationTime).format("DD MMM YYYY")}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(curr._creationTime).startOf("day").fromNow()}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <img src={user?.picture} alt='Logo' className='w-[32px] h-[32px] rounded-full mx-3 ' />
                  </td>
                  <td className="whitespace-nowrap  text-gray-900">
                    <DropdownMenu>
                      <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                      <DropdownMenuContent className=' '>
                        <DropdownMenuItem className='flex items-center gap-3 w-full font-bold cursor-pointer text-[16px]'><Archive className='w-4 h-4 '/>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FileList
