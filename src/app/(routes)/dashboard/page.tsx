"use client"
import React, { useEffect } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import FileList from './_components/FileList';
import FileHeader from './_components/FileHeader';

function dashboard() {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();
  const createUser = useMutation(api.User.createUser);

  const checkUser = async() => {
    const result = await convex.query(api.User.getUser, { email: user?.email })

    if (!result.length) {
      createUser({
        name: user?.given_name,
        email: user?.email,
        image: user?.picture
      })
    }
  }

  useEffect(()=>{
    user && checkUser();
  },[user])
  return (
    <div className='p-8'>
     <FileHeader user={user}/>
     <FileList user={user}/>
    </div>
  )
}

export default dashboard
