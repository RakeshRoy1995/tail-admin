import React from 'react'

export const Card = ({ icon, value, label }) => {

  return (

        <div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-lg  ">
      <div className="mb-4 text-blue-500">{icon}</div>
      <h2 className="text-xl font-bold">{value}</h2>
      <p className="text-sm text-gray-500 text-center">{label}</p>

    </div>

  )
}
