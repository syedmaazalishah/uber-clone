import React, { useLayoutEffect } from 'react'

import { ArrowLeft, CheckIcon, MapPin, StopCircle, CreditCard } from 'lucide-react';

import { ridePanelData } from '../../assets/assets.js';

import BigButton from '../BigButton.jsx';

function WaitingForDriver({ ref, selectedRide, setDriverConfirmed, setRideFoundPanelOpened, fares, locationDestination, locationPickup }) {

    // useLayoutEffect( function(){console.log(" ----> UseLayoutEffect ( RideFoundPanel ) : VehicleType -> " + selectedRide )} , [] )

    return (
        <div ref={ref} className="border z-120 left-0 right-0 max-w-screen h-screen bottom-0 overflow-y-scroll bg-white p-4 rounded-2xl flex flex-col justify-between" >

            <div className="flex justify-start gap-1 items-center relative">
                {/*                               /-----Fixthe SetDriverConfirmed */}
                <ArrowLeft size={28} onClick={() => { setRideFoundPanelOpened(false); setDriverConfirmed(false) }} />
                <h3 className="text-2xl font-semibold">Meet at Pickup Point</h3>
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="">
                    <div className="">
                        <div className="relative my-5 w-full flex items-center justify-between text-right">
                            <img src={ridePanelData[selectedRide]} alt="No Ride Selected Yet." className="z-105 h-25 aspect-square object-contain" />

                            <div className="w-full">
                                <h3 className="uppercase text-medium">[Driver Name]</h3>
                                <h3 className="text-xl text-nowrap font-bold uppercase">[Car Plate No]</h3>
                                <h3 className="text-nowrap text-sm">[Vehicle Type] : Carry [Capacity]</h3>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-3 pb-4 border-all-ine">

                        <div className="flex min-h-16 justify-start items-center border bg-gray-800/5 border-gray-500/50 rounded-xl p-2 gap-3 ">
                            <div className='h-full aspect-square flex justify-center items-center' >
                                <MapPin size={36} />
                            </div>
                            <div className="w-full">
                                <h3 className="text-lg font-semibold">
                                    {
                                        locationPickup
                                            ? (locationPickup)
                                            : (" Pickup Location .")
                                    }
                                </h3>
                            </div>
                        </div>
                        <div className="flex min-h-16 justify-start items-center border bg-gray-800/5 border-gray-500/50 rounded-xl p-2 gap-3 " >
                            <div className='h-full aspect-square flex justify-center items-center' >
                                <StopCircle size={36} />
                            </div>
                            <div className="w-full">
                                <h3 className="text-lg font-semibold">
                                    {
                                        locationDestination
                                            ? (locationDestination)
                                            : (" Destination Location .")
                                    }
                                </h3>
                            </div>
                        </div>
                        <div className="flex min-h-16 justify-start items-center border bg-gray-800/5 border-gray-500/50 rounded-xl p-2 gap-3 " >
                            <div className='h-full aspect-square flex justify-center items-center' >
                                <CreditCard size={36} />
                            </div>
                            <div className="w-full">
                                <h3 className="text-xl font-bold">Rs {fares[selectedRide]}</h3>
                                <h3 className="text-lg">Cash Cash</h3>
                            </div>
                        </div>

                    </div>
                </div>
                <BigButton
                    onClick={() => setDriverConfirmed(false)}
                    className='bg-green-700'
                    text="Make a Payment"
                    Icon={CheckIcon}
                    label='Payment Button'
                />
            </div>
        </div>
    )
}

export default WaitingForDriver