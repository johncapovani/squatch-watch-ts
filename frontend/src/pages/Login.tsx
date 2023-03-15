import { useState, useEffect, FC, ReactElement, FormEvent } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useAppSelector, useAppDispatch} from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import "./Login.css"
import { AuthCounterState, LoginState } from '../app/interfaces'

const Login:FC = ():ReactElement => {


  const [formData, setFormData] = useState<LoginState>({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state:any): AuthCounterState => state.auth
  )

  useEffect(():void => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e:any):void => {
    setFormData((prevState:LoginState):LoginState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e:FormEvent):void => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='login'>
        <section className='heading'>
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Login to interact with Squatch Watch!</p>
        </section>

        <section>
          <form className='lForm' onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='email'
                className='lform-control'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='lform-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <button type='submit' className='loginButton'>
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default Login