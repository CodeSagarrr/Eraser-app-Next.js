import { ChevronDown, GridIcon, LayoutGrid, LogOut, MenuSquare, Settings, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export interface Team {
  teamName: string;
  createdBy: string,
  _id: string,
  _creationTime : string,
}

function SideBarTop({ user , getActiveTeamId}: any) {
  const [TeamList, setTeamList] = useState<Team[]>()
  const [activeTeam, setActiveTeam] = useState<Team>()
  const navigate = useRouter();
  const convex = useConvex();
  const section = [
    { id: 1, name: " Join & Create Team", logo: Users, path: "/teams/create" },
    { id: 2, name: "Setting", logo: Settings, path: "" },
  ]

  const getTeams = async () => {
    const result = await convex.query(api.Teams.getTeams, { email: user?.email })
    setTeamList(result);
    setActiveTeam(result[0])
  }

  useEffect(() => {
    user && getTeams();
  }, [user])

  useEffect(() => {
    activeTeam && getActiveTeamId(activeTeam);
  }, [activeTeam])

 
  const handleRoute = (route:any) =>{
    if(route){
      navigate.push(route.path)
    }
  }
  return (
    <div className='p-6 flex flex-col'>
      <div className='flex items-center gap-3 py-2 px-4 rounded-md  cursor-pointer hover:bg-[#F6F6F6]'>
        <Image src="/logo-eraser.png" alt="Logo" width={40} height={40} />


        <Popover>
          <PopoverTrigger><h2 className='font-extrabold flex gap-3 items-center'>{activeTeam?.teamName} <ChevronDown /></h2></PopoverTrigger>
          <PopoverContent className='ml-6 mt-2'>
            <div>
              {
                TeamList && TeamList.map((curr, i) => (
                  <div key={i} className={`flex p-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-all rounded-md items-center gap-2 my-1
                    ${activeTeam?._id === curr._id ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => setActiveTeam(curr)}
                  >
                    <span className='font-semibold'>{curr.teamName}</span>
                  </div>
                ))
              }
            </div>
            <Separator className='my-2' />
            {
              section.map((item, i) => (
                <div key={i} className='flex p-2 cursor-pointer hover:bg-slate-100 rounded-md items-center gap-2 transition-all'
                onClick={() => handleRoute(item)}
                >
                  <item.logo className='w-5 h-5' />
                  <span className=' font-semibold'>{item.name}</span>
                </div>
              ))
            }
            <LogoutLink><span className='flex items-center gap-2 font-semibold p-2 hover:bg-slate-100 rounded-md'>
              <LogOut className='w-5 h-5' /> Logout</span></LogoutLink>
            <Separator className='my-2' />

            <div className='flex gap-2 items-center'>
              <Image src={user?.picture} alt="Logo" className='w-10 h-10 rounded-full' />
              <div className='flex flex-col ml-1'>
                <span className='text-[18px] font-bold'>{user?.given_name} {user?.family_name}</span>
                <span className='text-[14px] text-medium text-gray-400'>{user?.email}</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>

      </div>
      <Button className='mt-8 bg-[#f0f0f0] hover:bg-[#F0F0F0] text-black font-extrabold justify-start'>
        <LayoutGrid />   All Files
      </Button>
    </div>
  )
}

export default SideBarTop
