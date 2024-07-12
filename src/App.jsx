import './App.css'
import HomePage from './components/homePage'
import LoginForm from './components/userLogin'
import RegisterForm from './components/userRegister'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
    ]
  },
  {
    path: "/register",
    element: <RegisterForm />
  },
  {
    path: "/login",
    element: <LoginForm />
  },
])

function App() {
  return(
    <RouterProvider router={router} /> 
  )
}


export default App
