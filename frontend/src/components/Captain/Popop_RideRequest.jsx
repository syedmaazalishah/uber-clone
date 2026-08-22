import React from 'react'

import { Check, X , MapPin , CreditCard , StopCircle , User } from 'lucide-react'
import BigButton from '../BigButton'

function Popop_RideRequest({ id, setPopupRideReqShow , setPanel_ConfirmRideShow }) {
	return (
		<div id={id} className='fixed -top-full left-3 right-3 h-fit border rounded-2xl z-99999 bg-gray-100 p-4 flex flex-col gap-4'>

			<div className="mb-2">
				<h2 className='text-2xl my-3 px-3 font-bold' >A Ride For You.</h2>
			</div>

			<div className="flex justify-between items-center my-3 bg-yellow-400 text-black rounded-lg px-4 py-2">
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

			<div className="">
				<BigButton onClick={() => {setPopupRideReqShow(false);setPanel_ConfirmRideShow(true)}} Icon={Check} text='View Details' label='Confirm Fare' className='bg-green-500' />
				<BigButton onClick={() => setPopupRideReqShow(false)} Icon={X} text='Ignore' label='Reject Fare' className='bg-gray-300 text-red-800' />
			</div>

		</div>
	)
}

export default Popop_RideRequest