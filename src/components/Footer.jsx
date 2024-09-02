import React from 'react'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
        <hr className='border-black'/>
        <footer className='flex justify-center items-center text-center py-4'>
            <div className='flex justify-center items-center gap-2'>
                <p className='md:text-lg lg:text-xl'>Designed with </p>
                <FaHeart className='md:w-4 md:h-4 lg:w-5 lg:h-5'/>
                <p className='md:text-lg lg:text-xl'>by <span className='underline font-semibold'>Devnito</span></p>
            </div>
        </footer>
    </div>
  )
}
export default Footer