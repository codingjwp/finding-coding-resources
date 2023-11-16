import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import RecoilProvider from './utils/RecoilProvider.tsx'
import Toast from './components/Toast.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilProvider>
      <App />
      <Toast/>
    </RecoilProvider>
  </React.StrictMode>,
)
