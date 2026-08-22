import React from 'react' ;

import { useAppContext } from '../../contexts/AppContext.jsx'; 	
import { useUserContext } from '../../contexts/UserContext.jsx';

import assets from '../../assets/assets.js' ;
import { ArrowRight, Plus , CarTaxiFront , PersonStanding } from 'lucide-react';
import { Link , useNavigate } from 'react-router-dom' ;
import axios from '../../utils/axios.js' ;
import toast from 'react-hot-toast'

import BigButton from '../../components/BigButton.jsx' ;
import Loader from '../../components/Loader.jsx' ;

const UserLogin = () => {

  const [ loginData , setLoginData ] = React.useState({ email:'' , password:'' })
  const [ loading , setLoading ] = React.useState(false)

  const { token , setToken , apisDictionary } = useAppContext() ;
  const { user , setUser } = useUserContext() ;
  const navigate = useNavigate() ;

  function handleChange (e) {
    const { name , value } = e.target ;
    setLoginData( prev => ({ ...prev , [name] : value }) )
  }

  async function handleFormSubmit () {
    event.preventDefault() ;
    try {	
      setLoading( true ) ;
      const { data } = await axios.post( apisDictionary.CaptainLogin , loginData ) ;
      if ( data.success ) {
        localStorage.token = data.token ;
        localStorage.current = 'captain'
        setUser( data.captain )
        setToken( data.token )
        navigate("/home")
        toast.success( 'Login : Successfully.' )
      } else {
        toast.error( data.message ) ;
      }
    } catch ( err ) {
      toast.error( err.message === 'Network Error' ? 'Server is not Active Yet.' : err.message + " < false"  )
    } finally {
      setLoading( false )
    }
  }

  return (
    <section className='flex flex-col justify-between h-full' >
      <Loader text='Logging In' state={loading} />
      <div className="">
        <img src={assets.Logos.black} alt="Logo" className="w-30" />
        <ArrowRight size={25} className='ml-5 -mt-2' />

        <form className='p-5' onSubmit={handleFormSubmit} >

          <h3 className='text-base mb-2 font-medium' >What's Your Email?</h3>
          <input
            name="email"
            onChange={handleChange}
            type='email' required 
            placeholder='Enter Your Email'
            className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-full text-lg placeholder:text-base'
          />
          <p className="text-red-500 px-2 w-full hidden">No Account With This Email.</p>
          <div className="mb-4"></div>

          <h3 className='text-base mb-2 font-medium' >Enter Password.</h3>
          <input
            name="password"
            onChange={handleChange}
            type='password' required 
            placeholder='Enter Password'
            className='bg-[#eeeeee] outline-none1 mb-1 rounded-[8px] px-8 py-2 border w-full text-lg placeholder:text-base'
          />
          <p className="text-red-500 px-2 w-full hidden">No Account With This Email.</p>
          <div className="mb-4"></div>

          <p className='text-blue-600 w-full text-center text-lg font-semibold mb-5' >Forget Password?</p>

          <BigButton text='Login' IconBack={CarTaxiFront} onClick={ handleFormSubmit } label='Login' Icon={ ArrowRight } className='' />

          <p className="w-full text-center pt-2">
            <span className="">Join a Fleet? </span>
            <Link to='/captain-register' className='font-semibold text-blue-700' >Register As Captain.</Link>
          </p>

        </form>
      </div>

      <Link to='/login' className='p-5' >
        <BigButton
          label='User Sign In'
          text='Sign In as User'
          Icon={ ArrowRight } IconBack={PersonStanding}
          className='bg-[#d5622d]'
        />
      </Link>
    </section>
  )
}

export default UserLogin  