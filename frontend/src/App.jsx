import { useState, useEffect } from 'react'

// -- utils
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// -- pages
import StartPage from './pages/StartPage';
import PageProtectioWrapper from './pages/PageProtectioWrapper' ;

import HomePage from './pages/HomePage';
import RidingPage from './pages/RidingPage';

import UserLogin from './pages/User/UserLogin';
import UserRegister from './pages/User/UserRegister';

import CaptainLogin from './pages/Captain/CaptainLogin';
import CaptainRegister from './pages/Captain/CaptainRegister';


// -- components

const App = () => {
	return (
		<main className='h-screen w-screen' >
			<Toaster />
			<Routes >

				<Route path='/home' element={ <PageProtectioWrapper> <HomePage /> </PageProtectioWrapper>} />
				<Route path='/' element={ <StartPage /> } />
				<Route path='/login' element={ <UserLogin /> } />
				<Route path='/register' element={ <UserRegister /> } />

				<Route path='/captain-login' element={ <CaptainLogin /> } />
				<Route path='/captain-register' element={ <CaptainRegister /> } />

				<Route path='/riding' element={ <PageProtectioWrapper ><RidingPage /></PageProtectioWrapper>} />
			</Routes>

		</main>
	)
}

export default App  