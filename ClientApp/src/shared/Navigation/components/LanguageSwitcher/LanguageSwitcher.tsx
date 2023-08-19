import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('pl')

  console.log('i18n.language', i18n.language)
  const changeLanguage = (language: string) => {
    setSelectedLanguage(language)
    i18n.changeLanguage(language)
  }

  return (
    <div>
      <button
        onClick={() => changeLanguage('pl')}
        className={selectedLanguage === 'pl' ? 'selected' : ''}
      >
        pl
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={selectedLanguage === 'en' ? 'selected' : ''}
      >
        en
      </button>
    </div>
  )
}

export default LanguageSwitcher
