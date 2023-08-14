import React, { useEffect, useState } from 'react'

import './App.css'
import Login from './pages/LoginPage/Login'
import Navigation from './shared/Navigation/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/RegisterPage/Register'
import LandingPage from './pages/LandingPage/landingPage'
import BetPage from './pages/BetPage/BetPage'
import MatchResultPage from './pages/ResultPage/MatchResultPage'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store, { RootState } from './store/store'
import axios from 'axios'
import { setIsAuthenticated } from './store/authSlice'

function App() {
 
  const selectedMatches = useSelector((state: RootState) => state.selectedMatches.selectedMatches)

  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation />

        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/login' element={<Login onLogin={setIsAuthenticated} />} /> */}
            <Route path='/bet' element={<BetPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/result' element={<MatchResultPage matches={selectedMatches} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
