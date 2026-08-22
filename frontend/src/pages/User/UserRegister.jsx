import React from 'react';

import { useAppContext } from '../../contexts/AppContext.jsx';
import { useUserContext } from '../../contexts/UserContext.jsx' ;

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
		password: ''
	})

	const [loading, setLoading] = React.useState(false)

	const { token, setToken, apisDictionary } = useAppContext();
	const { user , setUser } = useUserContext() ;
	const navigate = useNavigate();

	function handleChange(e) {
		const { name, value } = e.target;

		if (name === 'firstname') {
			setRegisterData(prev => ({ ...prev, fullname: ({ ...prev.fullname, firstname: value }) }))
		} else if (name === 'lastname') {
			setRegisterData(prev => ({ ...prev, fullname: ({ ...prev.fullname, lastname: value }) }))
		} else {
			setRegisterData(prev => ({ ...prev, [name]: value }))
		}
	}

	async function handleFormSubmit() {
		event.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(apisDictionary.UserRegister, registerData);
			if (data.success) {
				localStorage.token = data.token;
				localStorage.current = 'user'
				setUser(data.user)
				setToken(data.token)
				navigate("/home")
				toast.success('Registeration : Successfully.')
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

				<form className='p-5' onSubmit={handleFormSubmit} >

					<h3 className='text-base mb-2 font-medium' >What's Your Name?</h3>
					<div className="flex gap-2">
						<input
							name="firstname"
							onChange={handleChange}
							type='text' required
							placeholder='First Name'
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

					<h3 className='text-base mb-2 font-medium' >What's Your Email?</h3>
					<input
						name="email" autoComplete='username'
						onChange={handleChange}
						type='email' required
						placeholder='Enter Your Email'
						className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-full text-lg placeholder:text-base'
					/>
					<p className="text-red-500 px-2 w-full hidden">No Account With This Email.</p>
					<div className="mb-4"></div>

					<h3 className='text-base mb-2 font-medium' >Enter Password.</h3>
					<input
						name="password" autoComplete='current-password'
						onChange={handleChange}
						type='password' required
						placeholder='Enter Password'
						className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-full text-lg placeholder:text-base'
					/>
					<p className="text-red-500 px-2 w-full hidden">No Account With This Email.</p>
					<div className="mb-4"></div>

					<BigButton text='Register' onClick={handleFormSubmit} label='Register' Icon={Plus} IconBack={PersonStanding} className='' />

					<p className="w-full text-center pt-2">
						<span className="">Already Have Account? </span>
						<Link to='/login' className='font-semibold text-blue-700' >Sign In.</Link>
					</p>

				</form>
			</div>

			<p className="text-xs text-gray-500 w-full px-5">
				By Proceeding you Consent to get Calls, WhatsApp or SMS messages, included by automated means, from Uber and its affiliates to the Email Provided.
			</p>

			<Link to='/captain-register' className='p-5' >
				<BigButton
					label='Captain Sign Up'
					text='Sign Up as Captain'
					Icon={Plus} IconBack={CarTaxiFront}
					className='bg-[#10b461]'
				/>
			</Link>
		</section>
	)
}

export default UserLogin 