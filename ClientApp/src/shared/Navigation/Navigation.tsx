﻿import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MobileNav from './components/MobileNav/MobileNav'
import DesktopNav from './components/DesktopNav/DesktopNav'
import { NavigationItems } from './components/navigationProps'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setIsAuthenticated } from '../../store/authSlice'
import axios from 'axios'

const Navigation = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  console.log('isAuthenticated w Nav', isAuthenticated)
  const isMobile = window.innerWidth < 768

  const logout = async () => {
    try {
      const response = await axios.post('/logout', null, { withCredentials: true })

      if (response.status === 200) {
        dispatch(setIsAuthenticated(false))
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  let navItems: NavigationItems[]

  const userClick = () => {
    console.log('click')
  }

  if (isAuthenticated) {
    navItems = [
      { text: 'Ranking', url: '', onClick: userClick },
      { text: 'Wyloguj się', url: '/login', onClick: logout },
      { text: 'Obstawiaj', url: '/bet' },
      { text: '', url: '', isProfileUser: true },
    ]
  } else {
    navItems = [
      { text: 'Logowanie', url: '/login' },
      { text: 'Rejestracja', url: '/register' },
    ]
  }

  return (
    <div className='navigation'>
      {isMobile ? <MobileNav navItems={navItems} /> : <DesktopNav navItems={navItems} />}
    </div>
  )
}

export default Navigation
