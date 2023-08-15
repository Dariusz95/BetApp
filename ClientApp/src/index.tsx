import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store/store'
import axios from 'axios'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import navigation_en from './translation/en/navigation.json'
import navigation_pl from './translation/pl/navigation.json'
import landingPage_pl from './translation/pl/landingPage.json'
import landingPage_en from './translation/en/landingPage.json'

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

axios.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  },
)

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'pl',
  resources: {
    en: {
      navigation: navigation_en,
      landingPage: landingPage_en,
    },
    pl: {
      navigation: navigation_pl,
      landingPage: landingPage_pl,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    {' '}
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
