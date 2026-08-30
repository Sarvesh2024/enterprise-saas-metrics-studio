import React from 'react'
import ReactDOM from 'react-dom/client' // Corrected import path
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
