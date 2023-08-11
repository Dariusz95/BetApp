import React, { useEffect, useState } from 'react'

import './App.css'
import Login from './pages/LoginPage/Login'
import Navigation from './shared/Navigation/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/RegisterPage/Register'
import Home from './pages/Home/Home'
import LandingPage from './pages/LandingPage/landingPage'
import BetPage from './pages/BetPage/BetPage'
import MatchResultPage from './pages/ResultPage/MatchResultPage'
import { Provider, useSelector } from 'react-redux'
import store, { RootState } from './store/store'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    ;(async () => {
      const response = await fetch('https://localhost:8000/api/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
        .then((response) => {
          if (response.ok) {
            setIsAuthenticated(true)
          }
        })
        .catch((error) => console.error('Error:', error))
    })()
  }, [])

  const selectedMatches = useSelector((state: RootState) => state.selectedMatches.selectedMatches)

  return (
    <div className='App'>
      <BrowserRouter>
        <Navigation isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />

        <main>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<Home isAuthenticated={isAuthenticated} />} />
            <Route path='/login' element={<Login onLogin={setIsAuthenticated} />} />
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
