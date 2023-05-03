import React, { useState } from 'react'
import './MobileNav.scss'
import { spawn } from 'child_process'
import { NavigationProps } from '../navigationProps'

const MobileNav: React.FC<NavigationProps> = (props: NavigationProps) => {
    // const MobileNav: React.FC<NavigationProps> = ({ navItems }) => {
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <nav className="navbar">
            <div className="menu-container">
                <a href="/" className="navbar-logo" onClick={closeMobileMenu}>
                    Logo
                </a>

                <button className="hamburger" onClick={toggleMenu}>
                    <div className={isOpen ? 'line line-1' : 'line'}></div>
                    <div className={isOpen ? 'line line-2' : 'line'}></div>
                    <div className={isOpen ? 'line line-3' : 'line'}></div>
                </button>
                <div
                    className={isOpen ? 'menu-overlay show' : 'menu-overlay'}
                    onClick={toggleMenu}
                ></div>
                <div className={isOpen ? 'menu show' : 'menu'}>
                    <ul className='menu-list'>
                        {props.navItems.map((item, index) => (
                            <li className='menu-list__item' key={index}>
                                {item.onClick ? (
                                    <button className='logout-btn' onClick={item.onClick}>
                                        {item.text}
                                    </button>
                                ) : (
                                    <a href={item.url}>{item.text}</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MobileNav
