import React from 'react';

import { useAppContext } from '../../contexts/AppContext.jsx';
import { useUserContext } from '../../contexts/UserContext.jsx';

import assets from '../../assets/assets.js';
import { ArrowRight, Plus, CarTaxiFront, PersonStanding } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios.js';
import toast from 'react-hot-toast'

import BigButton from '../../components/BigButton.jsx';
import Loader from '../../components/Loader.jsx';

const UserLogin = () => {

	const [registerData, setRegisterData] = React.useState({
		fullname: {
			firstname: '',
			lastname: ''
		},
		email: '',
		password: '',
		vehicle:{
			color:'',
			type:'',
			plate:'',
			capacity : 1
		}
	})
	const [loading, setLoading] = React.useState(false)
	const [ nexted , setNexted ] = React.useState(false)
	const { token, setToken, apisDictionary , constants } = useAppContext();
	const { setUser, user } = useUserContext()
	const navigate = useNavigate();


	
	function handleChange(e) {
		const { name, value } = e.target;
		
		if (name === 'firstname') {
			setRegisterData(prev => ({ ...prev, fullname: ({ ...prev.fullname, firstname: value }) }))
		} else if (name === 'lastname') {
			setRegisterData(prev => ({ ...prev, fullname: ({ ...prev.fullname, lastname: value }) }))
		} else if (name==='color') {
			setRegisterData(prev => ({ ...prev, vehicle: ({ ...prev.vehicle, color: value }) }))
		} else if (name==='capacity') { 
			setRegisterData(prev => ({ ...prev, vehicle: ({ ...prev.vehicle, capacity: Number(value) }) }))
		} else if (name==='plate') { 
			setRegisterData(prev => ({ ...prev, vehicle: ({ ...prev.vehicle, plate: value }) }))
		} else if (name==='type') { 
			setRegisterData(prev => ({ ...prev, vehicle: ({ ...prev.vehicle, type: value }) }))
		} else {
			setRegisterData(prev => ({ ...prev, [name]: value }))
		}
	}

	async function handleFormSubmit() {
		event.preventDefault();
	
		if ( 
			!registerData.email ||
			!registerData.fullname.firstname ||
			!registerData.password
		) {
			toast.error( 'Fill All the Required * Fields.' )
			return ;
		}

		if ( !nexted ) {
			setNexted( true ) ;
			return;
		}

		try {
			setLoading(true);
			const { data } = await axios.post(apisDictionary.CaptainRegister, registerData);
			if (data.success) {
				localStorage.token = data.token;
				localStorage.current = 'captain'
				setToken(data.token)
				setUser(data.captain)
				navigate("/home")
				toast.success('Registeration : Successfully.')
				setRegisterData({
					fullname: {
						firstname: '',
						lastname: ''
					},
					email: '',
					password: '',
					vehicle:{
						color:'',
						type:'',
						plate:'',
						capacity : 1
					}
				})
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			toast.error( err.message === 'Network Error' ? 'Server is not Active Yet.' : err.message + " < false"  )
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className='flex flex-col justify-between h-full' >
			<Loader text='Signing Up' state={loading} />
			<div className="">
				<img src={assets.Logos.black} alt="Logo" className="w-30" />
				<ArrowRight size={25} className='ml-5 -mt-2' />

				<form className='p-5' onSubmit={handleFormSubmit} >
					<div className='' hidden={nexted} >
						<h3 className='text-base mb-2 font-medium' >What's Your Name Captain?</h3>
						<div className="flex gap-2">
							<input
								name="firstname"
								onChange={handleChange}
								type='text' required
								placeholder='First Name *'
								className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-1/2 text-lg placeholder:text-base'
							/>
							<input
								name="lastname"
								onChange={handleChange}
								type='text' required
								placeholder='Last Name'
								className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-1/2 text-lg placeholder:text-base'
							/>
						</div>
						<p className="text-red-500 px-2 w-full hidden">No Account With This Email.</p>
						<div className="mb-4"></div>

						<h3 className='text-base mb-2 font-medium' >What's Your Email Captain?</h3>
						<input
							name="email"
							onChange={handleChange}
							type='email' required
							placeholder='Enter Your Email *'
							className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-full text-lg placeholder:text-base'
						/>
						<p className="text-red-500 px-2 w-full hidden">No Account With This Email.</p>
						<div className="mb-4"></div>

						<h3 className='text-base mb-2 font-medium' >Enter Password.</h3>
						<input
							name="password"
							onChange={handleChange}
							type='password' required
							placeholder='Enter Password *'
							className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-full text-lg placeholder:text-base'
						/>
						<p className="text-red-500 px-2 w-full hidden">No Account With This Email.</p>
						<div className="mb-4"></div>
					</div>
					<div className='' hidden={!nexted} >
						<h3 className='text-base mb-2 font-medium' >What's Your Vehicle Color & Type?</h3>
						<div className="flex gap-2">
							<select
								name="color"
								onChange={handleChange}
								required
								className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-2 py-2 border w-1/2 text-lg placeholder:text-base'
							>
								<option default value='none'>Select Color *</option>
								{	
									constants.vehicle.colors.map( (c,i) => (
										<option className='w-full mb-1 rounded-full bg-transparent' key={`color-${i}`} value={c}>{c}</option>
									) )
								}
							</select>
							<p className="text-red-500 px-2 w-full hidden">Invalid Color.</p>
							<select
								name="type"
								onChange={handleChange}
								required
								className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-2 py-2 border w-1/2 text-lg placeholder:text-base'
							>
								<option default value='none'>Select Type *</option>
								{	
									constants.vehicle.types.map( (c,i) => (
										<option className='w-full mb-1 rounded-full bg-transparent' key={`type-${i}`} value={c}>{c}</option>
									) )
								}
							</select>
							<p className="text-red-500 px-2 w-full hidden">Invalid Type.</p>
						</div>
						<div className="mb-4"></div>

						<h3 className='text-base mb-2 font-medium' >What's Your Vehicle Plate Number?</h3>
						<input
							name="plate"
							onChange={handleChange}
							type='text' required
							placeholder='Enter Vehicle Plate Number *'
							className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-full text-lg placeholder:text-base'
						/>
						<p className="text-red-500 px-2 w-full hidden">Plate Number must be 3 Latters.</p>
						<div className="mb-4"></div>

						<h3 className='text-base mb-2 font-medium' >How Many Fares can you Handle?</h3>
						<input
							name="capacity" 
							onChange={handleChange}
							type='number' required min={1}
							placeholder='Enter Capacity of Your Vehicle *'
							className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-full text-lg placeholder:text-base'
						/>
						<p className="text-red-500 px-2 w-full hidden">Vehicle Capacity should be atleast 1.</p>
						<div className="mb-4"></div>
					</div>

					<BigButton
						text= {!nexted ? 'Next' : 'Register As Captain'}
						IconBack={CarTaxiFront}
						onClick={handleFormSubmit}
						label='Register'
						Icon={ArrowRight} className='' 
					/>

					<p className="w-full text-center pt-2">
						<span className="">Already Have Account? </span>
						<Link to='/captain-login' className='font-semibold text-blue-700' >Sign In.</Link>
					</p>

				</form>
			</div>

			<p className="text-xs text-gray-500 w-full px-5">
				By Proceeding you Consent to get Calls, WhatsApp or SMS messages, included by automated means, from Uber and its affiliates to the Email Provided.
			</p>

			<Link to='/register' className='p-5' >
				<BigButton
					label='User Sign Up'
					text='Sign Up as User'
					Icon={Plus} IconBack={PersonStanding}
					className='bg-[#d5622d]'
				/>
			</Link>
		</section>
	)
}

export default UserLogin