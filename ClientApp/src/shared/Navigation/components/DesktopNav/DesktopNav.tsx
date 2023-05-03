import React from 'react'
import './DesktopNav.scss'
import { NavigationProps } from '../navigationProps'

const DesktopNav: React.FC<NavigationProps> = ({ navItems }) => {
    return (
        <div className="desktop-menu">
            <a href="/" className="desktop-menu__logo">
                Logo
            </a>
            <ul className='desktop-menu__items'>
                {navItems.map((item, index) => (
                    <li key={index}>
                        {item.onClick ? (
                            <button className='logout-btn' onClick={item.onClick}>{item.text}</button>
                        ) : (
                            <a href={item.url}>{item.text}</a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DesktopNav
