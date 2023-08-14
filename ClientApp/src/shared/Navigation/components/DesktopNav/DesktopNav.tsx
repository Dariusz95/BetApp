import React from 'react'
import './DesktopNav.scss'
import { NavigationProps } from '../navigationProps'
import ProfileMenu from '../ProfileMenu/ProfileMenu'

const DesktopNav: React.FC<NavigationProps> = ({ navItems }) => {
  const handleLogout = () => {
    // Obsłuż wylogowanie
  }

  return (
    <div className='desktop-menu'>
      <a href='/' className='desktop-menu__logo'>
        Logo
      </a>
      <ul className='desktop-menu__items m-0 font-weight-bold'>
        {navItems.map((item, index) => (
          <li key={index}>
            {item.isProfileUser ? (
              <ProfileMenu />
            ) : item.onClick ? (
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
  )
}

export default DesktopNav
