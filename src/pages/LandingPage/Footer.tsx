import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-100 py-8 border-t-4 border-yellow-500 mt-20">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center md:space-x-16 mb-4">
                <div className="text-black text-sm font-medium border-b-2 md:border-b-0  mb-4 md:mb-0">
                    <p className='px-5'>Planning & Implementation</p>
                </div>
                <div className="text-black text-sm font-medium mb-4 md:mb-0 ">
                    <p className='px-5'>Technical Support</p>
                </div>
                <div className="text-black text-sm font-medium border-b-2 md:border-b-0  mb-4 md:mb-0">
                    <p className='px-5'>System Development</p>
                </div>
            </div>

            <div className="text-center mt-4 text-sm text-gray-700">
                <p>Copyright © 2023, PKSF, All Rights Reserved</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer