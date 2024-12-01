import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react'
import React from 'react'

function FileHeader({user}:any) {
    return (
        <div className='flex justify-end w-full '>
            <div className='flex items-center gap-2 px-3  border rounded-sm'>
                <Search className='w-4 h-4' />
                <input type="text" placeholder='Search ...' className='outline-none' />
            </div>
            <div className='flex gap-2 '>
                <img src={user?.picture} alt='Logo' className='w-[32px] h-[32px] rounded-full mx-3 ' />
            </div>
            <Button className='gap-2 flex bg-blue-500 hover:bg-blue-600 h-8 w-24 rounded-sm'> <Send/> Invite</Button>
        </div>
    )
}

export default FileHeader
