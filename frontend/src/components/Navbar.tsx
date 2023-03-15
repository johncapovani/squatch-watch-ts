//read up on docs for useSelector, useDispatch, useNavigate

//import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

//Access the state to determine if user is logged in or not
import { useAppSelector, useAppDispatch} from '../app/hooks'
import { logout, reset } from '../features/auth/authSlice'
import { ReactElement, FC } from 'react'


const Navbar:FC = ():ReactElement => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  //I should have an interface for user or something, but that's backend
  const { user } = useAppSelector((state:any):any => state.auth)

  //Logout a user

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div>
        <Link className='logo' to='/'><img src="https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/bigfoot-or-sasquatch-sighting-29688-300x300.png" alt="" /></Link>
      </div>
      <ul className='list'>


        {user ? (
          <>
            <li>
              <Link className='nav n1' to='/report'>
                Report a Sighting
              </Link>
            </li>

            <li>
              <Link className='nav n3' to='/account'>
                My Profile
              </Link>
            </li>

            <li>
              <button className='nav b1' onClick={onLogout}>
                Logout
                <FaSignOutAlt />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className='nav n2' to='/login'>
                Login
                <FaSignInAlt />
              </Link>
            </li>
            <li>
              <Link className='nav n3' to='/register'>
                Register
                <FaUser />
              </Link>
            </li>
          </>
        )}


      </ul>
    </header>
  )
}

export default Navbar