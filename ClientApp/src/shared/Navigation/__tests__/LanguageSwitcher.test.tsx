import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher'
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next'
import i18n from 'i18next'
import './../../../../jest.config'

i18n.use(initReactI18next).init({
  resources: {},
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

describe('LanguageSwitcher', () => {
  it('should change language when buttons are clicked', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>,
    )

    const plButton = screen.getByText('pl')
    const enButton = screen.getByText('en')

    fireEvent.click(plButton)

    expect(plButton).toBeInTheDocument()
    expect(plButton).toHaveClass('selected')

    fireEvent.click(enButton)
    expect(enButton).toBeInTheDocument()
    expect(enButton).toHaveClass('selected')
  })
})
