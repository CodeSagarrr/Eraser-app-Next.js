import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Prize from './Prize'
import MaxPrize from '@/app/_max_Prize/MaxPrize'


function SideBarBottom({handleClick , totalFile}:any) {
  const section = [
    { id: 1, name: "Get Started", icon: Flag, path: "" },
    { id: 2, name: "Github", icon: Github, path: "" },
    { id: 3, name: "Archive", icon: Archive, path: "" },
  ]
  const [ fileInput , setFileInput ] = useState("")
  return (
    <div className=' p-6'>
      <div>
        {
          section.map((curr, i) => (
            <div key={i} className='flex p-1.5 cursor-pointer hover:bg-slate-100 rounded-md items-center gap-2 transition-all'>
              <curr.icon className='w-5 h-5' />
              <span className=' font-semibold'>{curr.name}</span>
            </div>
          ))
        }
      </div>
      <Dialog>
        <DialogTrigger className='w-full' asChild><Button className='bg-blue-500 hover:bg-blue-600 w-full px-4 font-bold mt-4 justify-start'
        >New File</Button></DialogTrigger>
      { totalFile < MaxPrize.MAX_FREE_PRIZE ?   <DialogContent>
          <DialogHeader>
            <DialogTitle>File Name</DialogTitle>
            <DialogDescription>
              <Input placeholder='Team Name ...' className='w-full px-2 py-1 rounded-sm mt-2' 
              onChange={(e) => setFileInput(e.target.value)}
              />      
                <DialogClose asChild>
                  <Button type="button" className='mt-3 w-[26%] bg-blue-500 hover:bg-blue-600'
                  disabled={!(fileInput && fileInput.length > 3)}
                  onClick={() => handleClick(fileInput)}
                  >
                    Create
                  </Button>
                </DialogClose>
            </DialogDescription>
          </DialogHeader>
        </DialogContent> : <Prize/>}
      </Dialog>


      <div className='w-full h-4 rounded-lg bg-gray-300 mt-2'>
        <div className={`${totalFile === 5 ? 'bg-red-500' : 'bg-blue-500'} h-4 rounded-lg`} style={{ width : `${(totalFile/5)*100}%`}}>

        </div>
      </div>
      <h2 className='mt-2 font-medium text-[13px] text-gray-700'><strong>{totalFile}</strong> out of <strong>{MaxPrize.MAX_FREE_PRIZE}</strong> files used.</h2>
      <p className='text-[12px] font-medium text-gray-400 mt-1'>Upgrade your plan for unlimited files & more features Upgrad.</p>
    </div>
  )
}

export default SideBarBottom
