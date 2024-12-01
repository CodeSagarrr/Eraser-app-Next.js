import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ArrowBigRight, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';


function Hero() {
    const { user }:any = useKindeBrowserClient();
    const router = useRouter();
    return (
        <div>
            <section className="bg-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl px-4 sm:py-36 py-36 lg:flex lg:h-[92vh]  h-[92vh]  lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1
                            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                        >
                            AI co-pilot

                            <span className="sm:block"> for technical design. </span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Deliver accurate, consistent designs faster
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <button
                                className="block w-full rounded border  bg-white px-9 py-3 text-sm font-medium text-black hover:bg-gray-300 transition-all focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"    
                            onClick={() => user ? router.push('/dashboard') : toast('You are not Registered')}
                            >
                               { user ? (<div className='flex gap-2 font-bold'>Dashboard <Home className='w-4 h-4 '/> </div>)  : (<div className='flex gap-2 font-bold'>Try Eraser <ArrowBigRight className='w-4 h-4 '/> </div>)  }
                            </button>

                    
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
