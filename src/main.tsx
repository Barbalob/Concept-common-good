import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Texts from './page/Texts.tsx'
import NotFound from './page/NotFound.tsx'
import Authors from './page/Authors.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/texts',
    element: <Texts/>
  },
  {
    path:'/authors',
    element: <Authors/>
  },
  {
    path:'*',
    element: <NotFound/>
  },
])


const theme = createTheme({
  palette: {
    mode: "light", // Или "dark" для темной темы
    primary: {
      main: "#DCCEBF", // Основной цвет (синий)
    },
    secondary: {
      main: "#988C7A", // Второстепенный цвет (красный)
    },
  },
  typography: {
    fontFamily: "Roboto Slab, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
    },
    button:{
      fontSize: "1.5rem"
    }
  },
  breakpoints: {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1460, 
        xl: 1920,
    },
},
});

createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </>
)
