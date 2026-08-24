import React from 'react';

import { ArrowLeft , Car , Motorbike , User2 } from 'lucide-react'

import { ridePanelData } from '../../assets/assets.js' ;

import axios from '../../utils/axios.js'
import toast from 'react-hot-toast';

function RideSelectionPanel( {ref, setSelectedLocation , get_fares_info , fares , locationPickup , locationDestination , ridesPanelOpened , setRidesPanelOpened , setSelectedRide , setWaitingForDriverPanelOpened } ) {

    React.useLayoutEffect( function () {
        if ( ridesPanelOpened ) {
            get_fares_info()
        }
    } , [ ridesPanelOpened ] )

    return (
        <div ref={ref} className="absolute border z-120 left-0 bottom-0 right-0 w-full h-screen overflow-y-scroll bg-white p-4 rounded-2xl">

            <div className="flex justify-start gap-1 items-center">
                <ArrowLeft size={28} onClick={()=>{setSelectedLocation('');setRidesPanelOpened(false)}} />
                <h4 className="text-2xl font-semibold">Choose Desired Ride.</h4>
            </div>

            <div className="flex flex-col gap-2 py-6 justify-start items-center">

                <div onClick={()=>{setSelectedRide('car');setWaitingForDriverPanelOpened(true) }} className="flex px-2 items-center justify-between gap-2 w-full border border-black/40 active:border-black bg-gray-1004 max-h-25 rounded-xl" >
                    <img src={ridePanelData.car} alt="" className="w-22 aspect-square object-contain" />
                    <div className="w-full py-2">
                        <h4 className="flex items-center gap-2 text-base font-bold">UberGo <span className="flex items-center gap-1"><User2 size={18} fill="#000000" /> 4</span></h4>
                        <p className="text-xs font-medium text-gray-800">2 Minutes Away</p>
                        <p className="text-xs text-gray-600">Affordable Compact Rides</p>
                    </div>
                    <h2 className="font-bold text-lg self-start mt-3 text-nowrap w-fit">Rs {fares.car ? fares.car : "0.00"}</h2>
                </div>
                <div onClick={()=>{setSelectedRide('motorcycle');setWaitingForDriverPanelOpened(true) }} className="flex px-2 items-center justify-between gap-2 w-full border border-black/40 active:border-black bg-gray-1004 max-h-25 rounded-xl" >
                    <img src={ridePanelData.motorcycle} alt="" className="w-22 aspect-square object-contain" />
                    <div className="w-full py-2">
                        <h4 className="flex items-center gap-2 text-base font-bold">UberGo <span className="flex items-center gap-1"><User2 size={18} fill="#000000" /> 4</span></h4>
                        <p className="text-xs font-medium text-gray-800">2 Minutes Away</p>
                        <p className="text-xs text-gray-600">Affordable Compact Rides</p>
                    </div>
                    <h2 className="font-bold text-lg self-start mt-3 text-nowrap w-fit">Rs {fares.motorcycle ? fares.motorcycle : "0.00"}</h2>
                </div>
                <div onClick={()=>{setSelectedRide('rikshaw');setWaitingForDriverPanelOpened(true) }} className="flex px-2 items-center justify-between gap-2 w-full border border-black/40 active:border-black bg-gray-1004 max-h-25 rounded-xl" >
                    <img src={ridePanelData.rikshaw} alt="" className="w-22 aspect-square object-contain" />
                    <div className="w-full py-2">
                        <h4 className="flex items-center gap-2 text-base font-bold">UberGo <span className="flex items-center gap-1"><User2 size={18} fill="#000000" /> 4</span></h4>
                        <p className="text-xs font-medium text-gray-800">2 Minutes Away</p>
                        <p className="text-xs text-gray-600">Affordable Compact Rides</p>
                    </div>
                    <h2 className="font-bold text-lg self-start mt-3 text-nowrap w-fit">Rs {fares.rikshaw ? fares.rikshaw : "0.00"}</h2>
                </div>

            </div>

        </div>
    )
}

export default RideSelectionPanel