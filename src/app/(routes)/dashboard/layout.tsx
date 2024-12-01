"use client";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex } from 'convex/react';
import React, { useEffect, useState } from 'react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideBar from './_components/SideBar';
import { FileListContext } from '@/app/_context/FileListContext';
import { Team } from './_components/SideBarTop';

function layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {

    const { user }:any = useKindeBrowserClient();
    const [ _FileList , setFileList] = useState<Team[]>();
    const convex = useConvex();
    const navigate = useRouter();

    const getTeams = async () => {
        const res = await convex.query(api.Teams.getTeams, { email: user?.email });
        if (!res?.length) {
            navigate.push("/teams/create")
        };
    }

    useEffect(() => {
        user && getTeams();
    }, [user]);

    return (
        <FileListContext.Provider value={{_FileList , setFileList}}>
            <div>
                <div className='grid grid-cols-4'>
                    <div className='w-72 fixed h-screen '>
                        <SideBar />
                    </div>
                    <div className=' col-span-4 ml-72'>

                        {children}

                    </div>
                </div>

            </div>
        </FileListContext.Provider>
    )
}

export default layout
