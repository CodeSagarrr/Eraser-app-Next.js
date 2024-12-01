import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

const Header = () => {

    return (
        <div>
            <header className="bg-black border-b">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block text-teal-600" href="#">
                        <span className="sr-only">Home</span>
                        <img src={'/logo-eraser.png'} alt="logo" width={40} height={40}/>
                    </a>

                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <a className="text-white transition hover:text-slate-500" href="#"> About </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-slate-500" href="#"> Careers </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-slate-500" href="#"> History </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-slate-500" href="#"> Services </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-slate-500" href="#"> Projects </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-slate-500" href="#"> Blog </a>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <span
                                    className="block rounded-md  px-5 py-2.5 text-sm font-medium text-white transition hover:text-gray-300"
                                   
                                >
                                   <LoginLink postLoginRedirectURL='/dashboard'>Login</LoginLink>
                                </span>

                                <span
                                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition hover:text-gray-800 sm:block"
                                    
                                >
                                   <RegisterLink>Register</RegisterLink>
                                </span>
                            </div>

                            <button
                                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                            >
                                <span className="sr-only">Toggle menu</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
