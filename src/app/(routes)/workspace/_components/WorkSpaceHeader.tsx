import { Button } from '@/components/ui/button'
import { Link, Save } from 'lucide-react'
import React from 'react'


function WorkSpaceHeader({ onSave , fileData}: any) {
    return (
        <div className='border p-2 flex justify-between items-center'>
            <div className='flex gap-3 items-center ml-4'>
                <img src="/logo-eraser.png" alt="Erasre" width={35} height={35} />
                <h2 className='font-extrabold text-[14px]'>{fileData?.fileName}</h2>
            </div>
            <div className='flex gap-3 items-center'>
                <Button className='bg-[#EB043B] hover:bg-[#c10d37] h-8 w-24 rounded-sm gap-2 flex transition-all'
                    onClick={() => onSave()}
                >Save <Save /></Button>
                <Button className='bg-blue-500 hover:bg-blue-600 h-8 w-24 rounded-sm gap-2 flex transition-all'>Share <Link /></Button>
            </div>
        </div>
    )
}

export default WorkSpaceHeader
