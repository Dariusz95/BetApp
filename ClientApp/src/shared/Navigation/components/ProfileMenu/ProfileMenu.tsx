import React, { useEffect, useState } from 'react'
import './ProfileMenu.scss'
import img from './../../../../assets/landing-page/footballer.png'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setIfRefreshCurrentUserDetails, setIsAuthenticated } from '../../../../store/authSlice'
import { UserInfo } from '../../../../models/User'
import { RootState } from '../../../../store/store'
import { useTranslation } from 'react-i18next'
const ProfileMenu = () => {
  console.log('ProfileMenu')
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({} as UserInfo)
  const dispatch = useDispatch()
  const ifRefresh = useSelector((state: RootState) => state.auth.ifRefreshCurrentUserDetails)
  const { t, i18n } = useTranslation('navigation')
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get('/current-user/', { withCredentials: true })
        console.log('resp', response)
        if (response.status === 200) {
          setCurrentUser(response.data)
          dispatch(setIsAuthenticated(true))
          dispatch(setIfRefreshCurrentUserDetails(false))
        }
      } catch (error) {
        console.error('Error:', error)
      }
    })()
  }, [ifRefresh, dispatch])

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
          <li>
            {' '}
            <button
              onClick={() => {
                i18n.changeLanguage('pl')
                console.log('pl')
              }}
            >
              pl
            </button>
            <button
              onClick={() => {
                i18n.changeLanguage('en')
                console.log('en')
              }}
            >
              en
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ProfileMenu
