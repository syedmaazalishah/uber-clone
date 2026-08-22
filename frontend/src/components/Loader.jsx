import React from 'react'

function Loader({ text = "Loading.." , state }) {
  return (
    state && <div className='absolute h-screen w-screen flex items-center justify-center gap-3 bg-gray-900/60' >
        <div className="w-12 h-12 border border-7 border-white border-t-[#00000000] rounded-full animate-spin">
        </div>
        <p className="text-4xl font-semibold text-white underline">{text}</p>
    </div>
  )
}

export default Loader