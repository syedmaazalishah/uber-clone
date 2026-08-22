import React from 'react'

import { X , MapPin , StopCircle , CreditCard } from 'lucide-react' ;

import { ridePanelData } from '../../assets/assets.js' ;

const SelectedRidePanel = ({ref,selectedRide,setSelectedRide,setSelectedRidePanelOpened}) => {

    

    return (
        <div ref={ref} className="absolute border z-120 left-0 right-0 max-w-screen h-screen bottom-0 overflow-y-scroll bg-white p-4 rounded-2xl" >
            <div className="mb-4">
                <h2 className="text-center text-xl font-semibold animate-pulse">Wait For Driver to Confirm.</h2>
                <X size={28} onClick={()=>setSelectedRidePanelOpened(false)} className='absolute right-4 top-4 z-106' />
            </div>
            <div className="relative h-50 flex items-center justify-center">
                <div className="animate-pulse w-40 h-20 bg-purple-500/60 rounded-[100%] absolute z-104"></div>
                <div className="animate-pulse w-60 h-30 bg-purple-400/60 rounded-[100%] absolute z-103"></div>
                <div className="animate-pulse w-80 h-40 bg-purple-300/60 rounded-[100%] absolute z-102"></div>
                <img src={ridePanelData[selectedRide]} alt="No Ride Selected Yet." className="z-105 w-50 aspect-square object-contain absolute" />
            </div>

            <div className="flex my-4 flex-col w-full gap-4">

                <div className="flex gap-2 justify-start items-center">
                    <div className='h-full mx-2 aspect-square' >
                        <MapPin size={36}  />
                    </div>
                    <div className="w-full">
                        <h3 className="text-xl font-bold">Near Azmat's Shop</h3>
                        <h3 className="text-lg">Umarabad Shaidu , Nowshehra</h3>
                    </div>
                </div>
                <div className="flex gap-2 justify-start items-center">
                    <div className='h-full mx-2 aspect-square' >
                        <StopCircle size={36}  />
                    </div>
                    <div className="w-full">
                        <h3 className="text-xl font-bold">Jehangira</h3>
                        <h3 className="text-lg">Nowshehra</h3>
                    </div>
                </div>
                <div className="flex gap-2 justify-start items-center">
                    <div className='h-full mx-2 aspect-square' >
                        <CreditCard size={36}  />
                    </div>
                    <div className="w-full">
                        <h3 className="text-xl font-bold">Rs 1499.00</h3>
                        <h3 className="text-lg">Cash Cash</h3>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SelectedRidePanel