import React from 'react'

import { Check, X , MapPin , CreditCard , StopCircle , User } from 'lucide-react'

import BigButton from '../BigButton'

import toast from 'react-hot-toast' ;
import { useNavigate } from 'react-router-dom'

function Panel_ConfirmRideRequest({ id, setPanel_ConfirmRideShow }) {

	const [ OTP , setOTP ] = React.useState( 0 ) ;

	const navigate = useNavigate() ;

	function handleConfirmFareRequest () {

		event.preventDefault() 

		if ( OTP > 999 && OTP < 10000 ) {
			// More Logic
			navigate("/riding")
		} else {
			toast.error( "OPT must be Four Digit Long Number." )
		}
	}

	return (
		<div id={id} className='w-screen h-screen fixed -bottom-full left-0 right-0 border rounded-2xl z-99999 bg-gray-100 p-4 flex flex-col gap-4'>

			<div className="mb-2">
				<h2 className='text-2xl my-3 px-3 font-bold' >A Ride For You.</h2>
			</div>

			<div className="flex justify-between items-center my-3 border-2 border-yellow-400 text-black rounded-xl px-4 py-2">
				<div className="flex justify-start gap-2 items-center">
					<div className=" w-14 h-14 rounded-full border flex justify-center items-center bg-white/75">
						<User size={36} />
					</div>
					<div className="">
						<h4 className='capitalize text-lg font-bold' > [Fare Name] </h4>
					</div>
				</div>
				<h4 className="text-center font-bold text-lg">[D] KM</h4>	
			</div>

			<div className="flex flex-col w-full gap-3 pb-4 border-all-ine">

				<div className="flex min-h-16 justify-start items-center border bg-gray-800/5 border-gray-500/50 rounded-xl p-2 gap-3 ">
					<div className='h-full aspect-square flex justify-center items-center' >
						<MapPin size={36} />
					</div>
					<div className="w-full">
						<h3 className="text-lg font-semibold"> [ From Location , Pickup Point ] </h3>
					</div>
				</div>
				<div className="flex min-h-16 justify-start items-center border bg-gray-800/5 border-gray-500/50 rounded-xl p-2 gap-3 " >
					<div className='h-full aspect-square flex justify-center items-center' >
						<StopCircle size={36} />
					</div>
					<div className="w-full">
						<h3 className="text-lg font-semibold"> [ To Location , Destination Point ] </h3>
					</div>
				</div>
				<div className="flex min-h-16 justify-start items-center border bg-gray-800/5 border-gray-500/50 rounded-xl p-2 gap-3 " >
					<div className='h-full aspect-square flex justify-center items-center' >
						<CreditCard size={36} />
					</div>
					<div className="w-full">
						<h3 className="text-xl font-bold">Rs [ Total Price ]</h3>
						<h3 className="text-lg">Cash Cash</h3>
					</div>
				</div>

			</div>

			<form className="w-full">
				<input
					required
					type="number"
					name="otp-captain"
					id="otp-captain"
					inputMode='numeric'
					max={9999} min={1000}
					placeholder='Enter OTP'
					className='w-full rounded-xl text-2xl font-mono py-2 px-4 outline-none border border-gray-600'
					onChange={e=>setOTP(e.target.value)}
				/>
				<div className=" gap-2">
					<BigButton type="submit" onClick={handleConfirmFareRequest} Icon={Check} text='Confirm' label='Confirm Fare' className={`bg-green-500 ${!(OTP > 999 && OTP < 10000) ? "max-md:hidden" : "" }`} />
					<BigButton type="button" onClick={() => setPanel_ConfirmRideShow(false)} Icon={X} text='Cancel' label='Reject Fare' className='bg-red-300 text-red-900' />
				</div>
			</form>


		</div>
	)
}

export default Panel_ConfirmRideRequest