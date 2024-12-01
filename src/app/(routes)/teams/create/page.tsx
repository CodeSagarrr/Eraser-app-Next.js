"use client"
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react';
import { User } from 'lucide-react'
import React, { useState } from 'react'
import { api } from '../../../../../convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';


function Teams() {
    const [textInput , setTextInput] = useState("");
    const { user }:any = useKindeBrowserClient();
    const navigate = useRouter();
    const createTeam = useMutation(api.Teams.createTeams);

    const handleTeams = () =>{
        createTeam({
           teamName: textInput,
           createdBy: user?.email,
        }).then((res) =>{
            if(res){
                toast("Teams create successfully");
                navigate.push("/dashboard")
            }
        }).catch(err => console.log(err || "error occurred"));
    }
    return (
        <div className='p-14'>
            <div className='flex gap-4'>
                <img src={"/logo-eraser.png"} alt="Logo" width={85} />
                <h2 className='text-2xl font-extrabold'>Eraser</h2>
            </div>
            <div className='flex items-center flex-col w-full mt-24'>
                <h2 className='text-4xl font-bold'>What should we call your team?</h2>
                <h2 className='text-gray-400 mt-3'>You can always change this later from settings.</h2>
                <h2 className='flex gap-2 mt-4 font-medium'> <User className='w-5 h-5' /> Team Name</h2>

                <input type="text" name="text" placeholder='Team Name ...' className='outline-[#4BC2EC]  border w-[29%] px-4 py-2 rounded-sm mt-4' 
                onChange={(e) => setTextInput(e.target.value)}
                />
                <Button
                 disabled={!(textInput && textInput.length > 3)}
                 onClick={handleTeams}
                 className='mt-5 w-[20%] bg-blue-500 hover:bg-blue-600'>Create Teams</Button>
                <p className='text-gray-400 mt-4 text-[14px]'>1 of 2</p>
            </div>
        </div>
    )
}

export default Teams
