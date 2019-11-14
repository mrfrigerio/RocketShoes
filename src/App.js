import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import './config/reactotronConfig'
import GlobalStyle from './styles/global'
import Routes from './routes'
import history from './services/history'
import store from './store'

import Header from './components/Header'

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Routes />
      </Router>
    </Provider>
  )
}
