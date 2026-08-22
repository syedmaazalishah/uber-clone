import React from 'react'

import { ArrowLeftIcon , CheckIcon , MapPin , StopCircle , CreditCard } from 'lucide-react' ;

import { ridePanelData } from '../../assets/assets.js' ;

import BigButton from '../BigButton.jsx' ;

function WaitingForDriver({ setWaitingForDriverPanelOpened , ref , selectedRide , setSelectedRidePanelOpened }) {


    return (
        <div ref={ref} className="absolute border z-120 left-0 right-0 max-w-screen h-screen bottom-0 overflow-y-scroll bg-white p-4 rounded-2xl flex flex-col justify-between" >
            <div className="mb-4">
                <ArrowLeftIcon size={28} onClick={()=>setWaitingForDriverPanelOpened(false)} className='absolute left-4 top-4 z-106' />
                <h2 className="text-center text-xl font-semibold animate-pulse">Looking for Nearby Rides.</h2>
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="">
                    <div className="">
                        <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
                        <div className="relative h-50 flex items-center justify-center">
                            <img src={ridePanelData[selectedRide]} alt="No Ride Selected Yet." className="z-105 w-50 aspect-square object-contain absolute" />
                        </div>
                    </div>
                    <div className="w-full mb-5 min-h-20 flex my-4 flex-col gap-2">

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
                <BigButton onClick={()=>setSelectedRidePanelOpened(true)} className='bg-green-700' text="Confirm Your Ride" Icon={CheckIcon} label='Confirm Ride Button' />
            </div>
        </div>
    )
}

export default WaitingForDriver