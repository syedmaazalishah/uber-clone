import React from 'react'

// -- icons
import { ArrowRightIcon } from 'lucide-react' ;

// -- utils
import { Link, useNavigate } from 'react-router-dom' ;

// -- assets
import assets from '../assets/assets.js';

// -- components
import BigButton from '../components/BigButton.jsx' ;

const HomePage = () => {

	const [ token ] = React.useState( localStorage?.token ) ;

	const navigate = useNavigate() ;

	React.useEffect( function () {
		if ( token ) {
			// navigate( '/home' )
		}
	} , [] )

	return (
		<section className="">

			<div className="h-screen relative w-full bg-red-100 flex flex-col justify-between bg-[url(./assets/lights_1.jpg)] bg-center bg-top bg-contain ">
				<img src={assets.Logos.black} alt="Logo" className="w-30" />
				<div className="bg-white w-full p-5 pb-7">
					<h2 className="text-3xl font-bold">Get Start With Uber</h2>
					<Link to='/login' >
						<BigButton className='mt-8' text="Continue" lable="Continue" Icon={ArrowRightIcon} />
					</Link>
				</div>
			</div>

		</section>
	)
}

export default HomePage