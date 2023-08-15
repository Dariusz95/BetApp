import React from 'react'
import './DesktopNav.scss'
import { NavigationProps } from '../navigationProps'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const DesktopNav: React.FC<NavigationProps> = ({ navItems }) => {
  const handleLogout = () => {
    // Obsłuż wylogowanie
  }

  const { t, i18n } = useTranslation('navigation')

  return (
    <div className='desktop-menu'>
      <Link className='desktop-menu__logo' to={'/'}>
        Logo
      </Link>
      <button
        onClick={() => {
          i18n.changeLanguage('pl')
          console.log('pl')
        }}
      >
        pl
      </button>
      <button
        onClick={() => {
          i18n.changeLanguage('en')
          console.log('en')
        }}
      >
        en
      </button>
      <ul className='desktop-menu__items m-0 font-weight-bold'>
        {navItems.map((item, index) => (
          <li key={index}>
            {item.isProfileUser ? (
              <ProfileMenu />
            ) : item.onClick ? (
              <Link className='text-container__buttonn' to={item.url} onClick={item.onClick}>
                {/* {item.text} */}
                {t(item.text)}
              </Link>
            ) : (
              <Link className='text-container__buttonn' to={item.url}>
                {/* {item.text} */}
                {t(item.text)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DesktopNav
