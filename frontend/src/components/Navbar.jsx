import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <div className='mx-auto max-w-6xl p-4 '>
            <div className='flex item-centre justify-between'>
                <Link to={"/"}>
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>
                        Thinkboard
                    </h1>
                </Link>
                <div className='flex items-centre gap-4'>
                    <Link to={"/create"} className='btn btn-primary'>
                        <PlusIcon/>
                        <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar