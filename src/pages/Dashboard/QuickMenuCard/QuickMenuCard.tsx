import React from 'react'

export const QuickMenuCard = () => {
  return (
    <div className=" shadow-md rounded-lg p-5 w-full max-w-sm bg-secondaryColor">
    <div className="bg-QuaternaryColor text-white rounded-md p-10 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Sales Statistics</h2>
      <div className="w-6 h-6 bg-white/20 rounded flex justify-center items-center">
        <span className="text-sm font-bold">...</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className=" bg-yellow-100 text-yellow-600 rounded-lg px-5 py-10 text-center cursor-pointer hover:bg-yellow-200">
        <p className="text-sm font-semibold">Weekly Sales</p>
      </div>
      <div className="bg-blue-100 text-blue-600 rounded-md px-5 py-10 text-center cursor-pointer hover:bg-blue-200">
        <p className="text-sm font-semibold">New Projects</p>
      </div>
      <div className="bg-red-100 text-red-600 rounded-md px-10 py-10 text-center cursor-pointer hover:bg-red-200">
        <p className="text-sm font-semibold">Item Orders</p>
      </div>
      <div className="bg-green-100 text-green-600 rounded-md px-10 py-10 text-center cursor-pointer hover:bg-green-200">
        <p className="text-sm font-semibold">Bug Reports</p>
      </div>
    </div>
  </div>
  )
}
