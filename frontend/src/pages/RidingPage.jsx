import React from 'react'

import assets, { ridePanelData } from '../assets/assets'

import { Home , CreditCard, MapPin , StopCircle, CheckIcon , ChevronUp} from 'lucide-react'

import BigButton from '../components/BigButton'

import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import GSAP from 'gsap'
import toast from 'react-hot-toast'

function RidingPage() {

    const navigate = useNavigate() ;

    // ---- User Riding Page Starts Here ------------------------------
    function User_RidingPage () {
        return (
            <section className="h-screen w-screen ">

                <div className="">
                    <img src={assets.Logos.white} alt="Logo" className="w-30 fixed top-0 left-0" />
                    <Home size={36} className="fixed top-5 right-5 text-white" onClick={()=>navigate("/home")} />
                </div>


                <div className="h-1/2">
                    <img src={assets.maps.map_1} alt="" className="h-full w-full object-cover" />
                </div>

                <div className="flex flex-col justify-between h-1/2 p-4">
                    <div className="">
                        <div className="">
                            <div className="relative w-full flex items-center justify-between text-right">
                                <img src={ridePanelData['car']} alt="No Ride Selected Yet." className="z-105 h-25 aspect-square object-contain" />

                                <div className="w-full">
                                    <h3 className="uppercase text-medium">[Driver Name]</h3>
                                    <h3 className="text-xl text-nowrap font-bold uppercase">[Car Plate No]</h3>
                                    <h3 className="text-nowrap text-sm">[Vehicle Type] : Carry [Capacity]</h3>
                                </div>

                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">

                
                            <div className="flex gap-2 justify-start items-center" >
                                <div className='h-full mx-2 aspect-square' >
                                    <StopCircle size={36} />
                                </div>
                                <div className="w-full">
                                    <h3 className="text-xl font-bold">Jehangira</h3>
                                    <h3 className="text-lg">Nowshehra</h3>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-start items-center" >
                                <div className='h-full mx-2 aspect-square' >
                                    <CreditCard size={36} />
                                </div>
                                <div className="w-full">
                                    <h3 className="text-xl font-bold">Rs 1499.00</h3>
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

            </section>
        )
    }





    // ---- User Riding Page Ends Here ------------------------------

    const [ pickedUp , setPickedUp ] = React.useState( false ) ;

    const [ completeRidePanelOpened , setCompleteRidePanelOpened ] = React.useState( false )
    
    useGSAP( function () {

        if ( completeRidePanelOpened ) {
            GSAP.to( document.getElementById( "complete-ride-panel" ) , {
                bottom : "0px"
            } )
        } else {
            GSAP.to( document.getElementById( "complete-ride-panel" ) , {
                bottom : "-" + (document.getElementById( "complete-ride-panel" ).clientHeight - 160) + "px"
            } )
        }

    } , [ completeRidePanelOpened ] )

    // ---- Captain Riding Page Starts Here
    function Captain_RidingPage () {
        return (
            <section className="h-screen w-screen ">

                <div className="">
                    <img src={assets.Logos.white} alt="Logo" className="w-30 fixed top-0 left-0" />
                    <Home size={36} className="fixed top-5 right-5 text-white" onClick={()=>navigate("/home")} />
                </div>


                <div className="h-[calc(100vh-160px)]">
                    <img src={assets.maps.map_1} className="h-full w-full object-cover" />
                </div>

                <div className="h-40">
                    {/* For Filling the Empty Space Under The Map */}
                </div>

                <div id="complete-ride-panel" className="fixed bottom-0 right-0 left-0 bg-yellow-400 ">
                    <div
                        className=" flex justify-center items-center my-2"
                        onClick={()=>setCompleteRidePanelOpened(prev=>(!prev))}
                    >
                        <ChevronUp size={30} className={completeRidePanelOpened && "rotate-x-180" } />
                    </div>
                    <div className='flex px-4 justify-between items-center h-full'>
                        <h3 className="text-lg font-bold w-55">[D KM] Away</h3>
                        {
                            pickedUp
                                ? (
                                    <BigButton
                                        className='bg-green-700'
                                        text='Finish Ride'
                                        Icon={CheckIcon}
                                        onClick={ () => {navigate("/home")}  }
                                    />
                                )
                                : (
                                    <BigButton
                                        className='bg-orange-700'
                                        text='Picked Up'
                                        onClick={ () => setPickedUp(true) }
                                    />
                                )
                        }
                    </div>

                        {
                            pickedUp
                                ? (
                                    <>
                                        <p className="text-xs font-bold text-red-900 px-4">
                                            Click This Button When You Have Reached The Destination and Make Payment.
                                        </p>
                                    </>
                                )
                                : (
                                    <>
                                        <p className="text-xs font-bold text-red-900 px-4">
                                            Click This Button When You Pick your Fare from Pickup Point.
                                        </p>
                                    </>
                                )
                        }

                    <div className="p-4 flex flex-col w-full gap-3">

                        <div className="flex min-h-16 justify-start gap-2 items-center border bg-white border-gray-500/50 rounded-xl px-2">
                            <div className='h-full aspect-square flex justify-center items-center' >
                                <MapPin size={36} />
                            </div>
                            <div className="w-full">
                                <h3 className="text-lg font-semibold">
                                    {
                                        pickedUp
                                        ? "[ To Location , Destination Point ]"
                                        : "[ From Location , Pickup Point ]"
                                    }
                                </h3>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        )
    }
    // ---- Captain Riding Page Ends Here

    // ---- Main Component Returns
    return localStorage.current === 'captain'
        ? Captain_RidingPage()
        : User_RidingPage()
}

export default RidingPage