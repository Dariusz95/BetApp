import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Authorization } from '../../api/Api-login'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setJwtToken } from '../../store/authSlice'

const Login = (props: { onLogin: (isAuthenticated: boolean) => void }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('a@a.pl')
  const [password, setPassword] = useState('123')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    console.log('submit')
    Authorization.login({ email, password }, { withCredentials: true })
      .then((response) => {
        console.log(response)
        if (response) {
          console.log('here')
          const jwtToken = Cookies.get('jwt')
          if (jwtToken) {
            dispatch(setJwtToken(jwtToken))
            props.onLogin(true)
            setRedirect(true)
            console.log('jwtToken', jwtToken)
          }
          console.log('jwtToken', jwtToken)
        }
      })
      .catch((error) => console.error('Error:', error))

    // const res = await fetch('https://localhost:8000/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',
    //   body: JSON.stringify({ email, password }),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       props.onLogin(true)
    //       setRedirect(true)
    //     }
    //   })
    //   .catch((error) => console.error('Error:', error))
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  return (
    <form onSubmit={submit} className='form-signin'>
      <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>

      <input
        type='email'
        className='form-control'
        placeholder='Email address'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        className='form-control'
        placeholder='Password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='btn btn-lg btn-primary btn-block' type='submit'>
        Sign in
      </button>
      <p className='mt-5 mb-3 text-muted'>&copy; 2017-2018</p>
    </form>
  )
}

export default Login
