import React from 'react'
import ReactDOM from 'react-dom/client'

//pages
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn/index.jsx'
import { SignUp } from './pages/SignUp/index.jsx'

//theme
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme.js'
import GlobalStyles from './styles/global.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SignUp />
    </ThemeProvider>
  </React.StrictMode>,
)
