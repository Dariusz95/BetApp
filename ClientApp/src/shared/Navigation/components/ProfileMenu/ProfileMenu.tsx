import React, { useEffect, useState } from 'react'
import './ProfileMenu.scss'
import img from './../../../../assets/landing-page/footballer.png'
import { Avatar } from '@mui/material'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setIsAuthenticated } from '../../../../store/authSlice'
import { UserInfo } from '../../../../models/User'
const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({} as UserInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get('/current-user/', { withCredentials: true })
        console.log('resp', response)
        if (response.status === 200) {
          console.log('a', response.data)
          setCurrentUser(response.data)
          dispatch(setIsAuthenticated(true))
        }
      } catch (error) {
        console.error('Error:', error)
      }
    })()
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='avatar d-flex'>
      <Avatar alt='Remy Sharp' src={img} onClick={toggleDropdown} />
      {currentUser && (
        <span className='d-flex flex-column user-info'>
          <span>{currentUser.userName}</span>
          <span>{currentUser.coinsAmount}</span>
        </span>
      )}
      {isOpen && (
        <ul className='avatar__dropdown'>
          <li>Profil</li>
          <li>Ustawienia</li>
          <li>Wyloguj</li>
        </ul>
      )}
    </div>
  )
}

export default ProfileMenu
