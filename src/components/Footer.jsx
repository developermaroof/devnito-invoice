import React from 'react'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
        <hr className='border-black'/>
        <footer className='flex justify-center items-center text-center py-2'>
            <div className='flex justify-center items-center gap-2'>
                <p>Designed with </p>
                <FaHeart />
                <p>by <span className='underline font-semibold'>Devnito</span></p>
            </div>
        </footer>
    </div>
  )
}
export default Footer