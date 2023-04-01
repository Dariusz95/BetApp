import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = (props: {
    isAuthenticated: boolean
    onLogout: (isAuthenticated: boolean) => void
}) => {
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
    let menu

    if (props.isAuthenticated) {
        menu = (
            <ul className="navbar-nav me-auto mb-md-8">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={logout}>
                        Logout
                    </Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-md-8">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Home
                </Link>
                <div>{menu}</div>
            </div>
        </nav>
    )
}

export default Navigation
