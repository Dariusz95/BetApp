import React, { useEffect, useState } from 'react'

import './App.css'
import Login from './pages/Login'
import Navigation from './shared/Navigation/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import LandingPage from './landing-page/landingPage'

function App() {
    const [isAuthenticated,setIsAuthenticated] = useState(false)

    useEffect(()=>{
        (async ()=>{
            const response = await fetch('https://localhost:8000/api/user', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            }).then((response) => {
                console.log('response',response);
                if (response.ok) {
                    setIsAuthenticated(true)
                }
            })
            .catch((error) => console.error('Error:', error))
            
        })();
    });


    return (
        <div className="App">
            <BrowserRouter>
                <Navigation isAuthenticated={isAuthenticated}  onLogout={setIsAuthenticated}/>

                <main>
                    <Routes>
                        <Route path="/" element={<LandingPage/>} />
                        <Route path="/home" element={<Home isAuthenticated={isAuthenticated}/>} />
                        <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default App
