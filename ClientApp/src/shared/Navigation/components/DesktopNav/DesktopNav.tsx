import React from 'react'
import './DesktopNav.scss'
import { NavigationProps } from '../navigationProps'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { Link } from 'react-router-dom'

const DesktopNav: React.FC<NavigationProps> = ({ navItems }) => {
  const handleLogout = () => {
    // Obsłuż wylogowanie
  }

  return (
    <div className='desktop-menu'>
      <Link className='desktop-menu__logo' to={'/'}>
        Logo
      </Link>
      <ul className='desktop-menu__items m-0 font-weight-bold'>
        {navItems.map((item, index) => (
          <li key={index}>
            {item.isProfileUser ? (
              <ProfileMenu />
            ) : item.onClick ? (
              <Link className='text-container__buttonn' to={item.url} onClick={item.onClick}>
                {item.text}
              </Link>
            ) : (
              <Link className='text-container__buttonn' to={item.url}>
                {item.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DesktopNav
