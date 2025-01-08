import { createRoot } from 'react-dom/client'
import App from './page/Words.tsx'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import Texts from './page/Texts.tsx'
import NotFound from './page/NotFound.tsx'
import Authors from './page/Authors.tsx'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import SelectedWord from './page/SelectedWord.tsx'
import SelectedAuthor from './page/SelectedAuthor.tsx'
import SelectedTextDescription from './page/SelectedTextDescription.tsx'
import SelectedTextPart from './page/SelectedTextPart.tsx'
import About from './page/About.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Navigate to="/words" replace />
  },
  {
    path:'/words',
    element: <App/>
  },
  {
    path:'/texts',
    element: <Texts/>
  },
  {
    path:'/textDescription/:id',
    element: <SelectedTextDescription/>
  },
  {
    path:'/text/:id',
    element: <SelectedTextPart/>
  },
  {
    path:'/authors',
    element: <Authors/>
  },
  {
    path:'/authors/:id',
    element: <SelectedAuthor/>
  },
  {
    path:'/words/:id',
    element: <SelectedWord/>
  },
  {
    path:'/about',
    element: <About/>
  },
  // {
  //   path:'*',
  //   element: <Navigate to="/error" replace />
  // },
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
    h2: {
      fontSize: "2.0rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.0rem",
    },
    h5: {
      fontSize: "0.9rem",
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </>
)
