import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileNav from './components/MobileNav/MobileNav'
import DesktopNav from './components/DesktopNav/DesktopNav'
import { NavigationItems } from './components/navigationProps'

const Navigation = (props: {
    isAuthenticated: boolean
    onLogout: (isAuthenticated: boolean) => void
}) => {
    const isMobile = window.innerWidth < 768

    const logout = async () => {
        const res = await fetch('https://localhost:8000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    props.onLogout(false)
                }
            })
            .catch((error) => console.error('Error:', error))
    }
    let navItems: NavigationItems[]

    if (props.isAuthenticated) {
        navItems = [{ text: 'Wyloguj się', url: '/login', onClick: logout }]
    } else {
        navItems = [
            { text: 'Logowanie', url: '/login' },
            { text: 'Rejestracja', url: '/register' },
        ]
    }

    return (
        <div className="navigation">
            {isMobile ? (
                <MobileNav navItems={navItems} />
            ) : (
                <DesktopNav navItems={navItems} />
            )}
        </div>
    )
}

export default Navigation
