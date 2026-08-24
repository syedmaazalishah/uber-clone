import React from 'react'

import { useAppContext } from '../contexts/AppContext' ;
import { useNavigate } from 'react-router-dom' ;
import { useGSAP } from '@gsap/react' ;
import { gsap } from 'gsap' ;

import moment from 'moment'

import { ChevronDown , User , Clock, MapPin, ArrowRight   } from 'lucide-react' ;
import { MdSpeed , MdMoney, MdOutlineMoney } from 'react-icons/md'

import assets , { ridePanelData } from '../assets/assets' ;

import BigButton from '../components/BigButton';

import { debounce } from '../utils/debounce.js';
import axios from '../utils/axios.js'

// ----- User ---- Imports

import LocationsSearchPanel from '../components/LocationsSearchPanel' ;
import RideSelectionPanel from '../components/User/RideSelectionPanel' ;
import SelectedRidePanel from '../components/User/WaitingForDriverConfirm' ;
import WaitingForDriver from '../components/User/ConfirmRide' ;
import RideFoundPanel from '../components/User/RideFoundPanel' ;


// ---- Captain ---- Imports

import Popop_RideRequest from '../components/Captain/Popop_RideRequest';
import Panel_ConfirmRideRequest from '../components/Captain/Panel_ConfirmRideRequest';
import toast from 'react-hot-toast';

function HomePage() {

	const [ locationPickup , setLocationPickup ] = React.useState('') ;
	const [ locationDestination , setLocationDestination ] = React.useState('') ;
	const [ activeInput , setActiveInput ] = React.useState( null )

	const [ pickupSuggstions , setPickupSuggestions ] = React.useState(['Mock' , 'location' ,'for' , 'Pickup'])
	const [ destinationSuggstions , setDestinationSuggestions ] = React.useState(['Mock' ,  'Location ' , 'for ' , 'Destination'])

	const [ selectedLocation , setSelectedLocation ] = React.useState( '' ) ;
	const [ selectedRide , setSelectedRide ] = React.useState('car') ;
	const [ selectedDriver , setSelectedDriver ] = React.useState('') ;

	const [ driverConfirmed , setDriverConfirmed ] = React.useState( true )

	const [ locationsPanelOpened , setLocationsPanelOpened ] = React.useState( false ) ;
	const [ ridesPanelOpened , setRidesPanelOpened ] = React.useState( false ) ;
	const [ selectedRidePanelOpened , setSelectedRidePanelOpened ] = React.useState( false ) ;
	const [ waitingForDriverPanelOpened , setWaitingForDriverPanelOpened ] = React.useState( false ) ;
	const [ rideFoundPanelOpened , setRideFoundPanelOpened ] = React.useState( false )

	const { token } = useAppContext() ;
	const navigate = useNavigate()

	const ridesPanelRef = React.useRef( null ) ;
	const selectedRideRef = React.useRef( null ) ;
	const locationsPanelRef = React.useRef( null ) ; 

	async function handleLocationFormSubmit (e) {

		e.preventDefault() ;
		if ( locationPickup !== '' && locationDestination !== "" ) {
			setRidesPanelOpened(true)
		}
		
	}

	async function handlePickupSuggestions (e) {
		await setLocationPickup( e.target.value )
		debounce(async function(){
			try {	
				// console.log(locationPickup)
				const { data } = await axios.get( "/api/map/get-suggestions" , {
					params : {
						query : e.target.value
					}
				}) ;
				if ( data.success ) {
					setPickupSuggestions( data.suggestions )
				} else {
					toast.error( data.message )
				}
			} catch (err) {
				toast.error(err.message)
			}
		})()
	}
	function handleDestinationSuggestions (e) {
		setLocationDestination( e.target.value )
		debounce(async function(){
			try {	
				// console.log(locationDestination)
				const { data } = await axios.get( "/api/map/get-suggestions" , {
					params : {
						query : e.target.value()
					}
				}) ;
				if ( data.success ) {
					setDestinationSuggestions( data.suggestions )
				} else {
					toast.error( data.message )
				}
			} catch (err) {
				toast.error(err.message)
			}
		})()
	}

	React.useLayoutEffect( function() {
		if ( !token ) {
			navigate("/login")
		}
	} , [] )

	
	function User_HomePage ( ) {

		useGSAP( function() {
			if ( locationsPanelOpened ) {
				gsap.to( locationsPanelRef.current ,{
					height: window.innerHeight - 200  + "px"
				})
			} else {
				gsap.to( locationsPanelRef.current ,{
					height: '0px'
				})
			}
		} , [ locationsPanelOpened ] )

		useGSAP( function() {
			if ( ridesPanelOpened ) {
				gsap.to( document.getElementById("panel-2") , {
					bottom : '0px'
				} )
			} else {
				gsap.to( document.getElementById("panel-2") , {
					bottom : '-100%'
				} )
			}
		} , [ ridesPanelOpened ] )
		
		useGSAP( function() {
			if ( waitingForDriverPanelOpened ) {
				gsap.to( document.getElementById("panel-3") , {
					bottom : '0px'
				} )
			} else {
				gsap.to( document.getElementById("panel-3") , {
					bottom : '-100%'
				} )
			}
		} , [ waitingForDriverPanelOpened] )

		useGSAP( function() {
			if ( selectedRidePanelOpened || rideFoundPanelOpened ) {
				gsap.to( document.getElementById("panel-4") , {
					bottom : '0px'
				} )
			} else {
				gsap.to( document.getElementById("panel-4") , {
					bottom : '-100%'
				} )
			}
		} , [ selectedRidePanelOpened , rideFoundPanelOpened ] )

		return (
			<section className="relative">
				
				<img src={assets.Logos.white} alt="Logo" className="w-30 fixed top-0 left-0" />
				
				<div className="h-screen w-screen ">
					<img src={assets.maps.map_1} alt="" className="h-full w-full object-cover" />
				</div>

				<div className="absolute w-full max-h-screen overflow-y-hidden bottom-0 rounded-2xl flex flex-col justify-end items-center">
					
					<div className="p-4 bg-white">
						<div className="flex justify-between items-center">
							<h4 className="text-3xl font-semibold">Find a Trip.</h4>
							{locationsPanelOpened && <ChevronDown size={28} onClick={()=>setLocationsPanelOpened(false)} /> }
						</div>
						
						<form action="" onSubmit={ handleLocationFormSubmit } className="py-4 relative">
							<div className="absolute left-6 top-9 h-18 w-1 rounded-full bg-gray-800">
								<div className="absolute h-3 w-3 -left-1 -top-1 bg-gray-800 rounded-full"></div>
								<div className="absolute h-3 w-3 -left-1 bottom-0 bg-gray-800 rounded-full"></div>
							</div>
							<input value={locationPickup} onClick={ () => { setLocationsPanelOpened(true) ; setActiveInput("pickup") } } onChange={ handlePickupSuggestions } name='pickup' type="text" className="px-12 rounded-xl py-2 w-full text-lg bg-[#eeeeee] border" placeholder='Add a Pickup Location.' />
							<input value={locationDestination} onClick={ () => { setLocationsPanelOpened(true) ; setActiveInput("destination") } } onChange={ handleDestinationSuggestions } name='destination' type="text" className="px-12 rounded-xl py-2 w-full text-lg bg-[#eeeeee] border mt-4" placeholder='Enter Your Destination.' />
							{ locationPickup && locationDestination && <BigButton text='Find Trip' Icon={ArrowRight} type='submit' onClick={handleLocationFormSubmit} className='bg-green-600' />}
						</form>
					</div>

					<div ref={ locationsPanelRef } className={`w-full bg-white`}>
						<h2 className="font-semibold flex gap-2 pl-4"> <MapPin /> Locations Suggestions.</h2>
						<LocationsSearchPanel
							locationPickup={locationPickup}
							activeInput={activeInput}
							setLocationPickup={setLocationPickup}
							pickupSuggstions={pickupSuggstions}
							destinationSuggestions={destinationSuggstions}
							setLocationDestination={setLocationDestination}
							setSelectedLocation={setSelectedLocation}
							selectedLocation={selectedLocation}
							setRidesPanelOpened={setRidesPanelOpened}
						/>
					</div>

				</div>

				<div id='panel-2' className=" w-screen fixed -bottom-full left-0">
				<RideSelectionPanel
					ref={ridesPanelRef}
					setSelectedLocation={setSelectedLocation}
					setRidesPanelOpened={setRidesPanelOpened}
					ridesPanelOpened={ridesPanelOpened}
					locationPickup={locationPickup}
					locationDestination={locationDestination}
					selectedRide={selectedRide}
					setSelectedRide={setSelectedRide}
					setSelectedRidePanelOpened={setSelectedRidePanelOpened}
					setWaitingForDriverPanelOpened={setWaitingForDriverPanelOpened}
				/>
				</div>

				<div id='panel-3' className=" w-screen fixed -bottom-full left-0">
					<WaitingForDriver
						selectedDriver={selectedDriver}
						setSelectedDriver={setSelectedDriver}
						setWaitingForDriverPanelOpened={setWaitingForDriverPanelOpened}
						waitingForDriverPanelOpened={waitingForDriverPanelOpened}
						setSelectedRidePanelOpened={setSelectedRidePanelOpened}
						selectedRide={selectedRide}
					/>
				</div>

				<div id='panel-4' className=" w-screen fixed -bottom-full left-0">
					{
						driverConfirmed
						? (
							<RideFoundPanel
								selectedRide={selectedRide}
								setDriverConfirmed={setDriverConfirmed}
								setRideFoundPanelOpened={setRideFoundPanelOpened}
							/>
						)
						: (
							<SelectedRidePanel
								ref={selectedRideRef}
								selectedRide={selectedRide}
								setSelectedRide={setSelectedRide}
								selectedRidePanelOpened={selectedRidePanelOpened}
								setSelectedRidePanelOpened={setSelectedRidePanelOpened}
								setWaitingForDriverPanelOpened={setWaitingForDriverPanelOpened}
							/>
						)
					}

				</div>
			</section>
		)
	}

	// --- > User Home Page Done Here ----------------------------
	
	
	// --- > Captain Home Page Start Here ----------------------------

	const [ popup_ride_req_show , setPopupRideReqShow ] = React.useState( false )
	const [ panel_confirmRide_show , setPanel_ConfirmRideShow ] = React.useState( false )

	function Captain_HomePage ( ) { 

		useGSAP( function () {
			if ( popup_ride_req_show ) {
				gsap.to( document.getElementById( "request-popup" ) , {
					top : "12px"
				})
			} else {
				gsap.to( document.getElementById( "request-popup" ) , {
					top : "-100%"
				})
			}
		} , [ popup_ride_req_show ] )

		useGSAP( function () {
			if ( panel_confirmRide_show ) {
				gsap.to( document.getElementById( "panel-confirmRide" ) , {
					bottom : "0px"
				})
			} else {
				gsap.to( document.getElementById( "panel-confirmRide" ) , {
					bottom : "-100%"
				})
			}
		} , [ panel_confirmRide_show ] )

		return (
			<section className="relative h-screen">
				
				<img src={assets.Logos.white} onClick={()=>setPopupRideReqShow( true )} alt="Logo" className="w-30 fixed top-0 left-0" />
				
				<div className="h-[calc(100vh-250px)]">
					<img src={assets.maps.map_1} alt="" className="h-full w-full object-cover" />
				</div>

				<div className="h-62.5 p-4">
					{/* Header */}
					<div className="flex justify-between items-center">
						<div className="flex justify-start gap-2 items-center">
							<div className=" w-14 h-14 rounded-full border flex justify-center items-center">
								<User size={36} />
							</div>
							<div className="">
								<h4 className='capitalize text-lg font-bold' > [Driver Name] </h4>
								<h5 className='capitalize text-medium text-gray-500' > Basic Level Driver </h5>
							</div>
						</div>
						<div className="">
							<h4 className='capitalize text-lg font-bold' >PKR 2900.00</h4>
							<h5 className='capitalize text-medium text-gray-700' >Earned</h5>
						</div>
					</div>

					{/* Dashboard */}
					<div className="flex bg-yellow-400 rounded-2xl py-2 w-full justify-evenly flex-nowrap items-center mt-5">

						<div className="h-fit w-fit flex flex-col gap-1 justify-center items-center rounded-xl py-2 px-1">
							<Clock size={36} className='' />
							<h5 className="font-semibold text-2xl">{moment.duration(Date.now()).hours()}</h5>
							<p className="text-sm">Hours Online</p>
						</div>
						<div className="h-fit w-fit flex flex-col gap-1 justify-center items-center rounded-xl py-2 px-1">
							<MdSpeed size={36} className='' />
							<h5 className="font-semibold text-2xl">{moment.duration(Date.now()).hours()}</h5>
							<p className="text-sm">Hours Online</p>
						</div>
						<div className="h-fit w-fit flex flex-col gap-1 justify-center items-center rounded-xl py-2 px-1">
							<MdOutlineMoney size={36} className='' />
							<h5 className="font-semibold text-2xl">{moment.duration(Date.now()).hours()}</h5>
							<p className="text-sm">Hours Online</p>
						</div>

					</div>

				</div>

				<div className={` ${popup_ride_req_show ? "fixed h-screen w-screen bg-gray-500/50 top-0 left-0" : ""}`}>
					<Popop_RideRequest
						id="request-popup"
						setPopupRideReqShow={setPopupRideReqShow}
						setPanel_ConfirmRideShow={setPanel_ConfirmRideShow}
					/>
				</div>

				
				<div className={`relative ${panel_confirmRide_show ? "fixed h-screen w-screen bg-gray-500/50 top-0 left-0" : ""}`}>
					<Panel_ConfirmRideRequest
						id="panel-confirmRide"
						setPanel_ConfirmRideShow={setPanel_ConfirmRideShow}
					/>
				</div>
				
			</section>
		)
	}

	// --- > Captain Home Page Done Here ----------------------------


	// --- > Fina Home Page Return 

	return localStorage.current === 'user'
		? User_HomePage()
		: Captain_HomePage()

}

export default HomePage