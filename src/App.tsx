
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './Modules/Shared/components/AuthLayout/AuthLayout'
import Login from './Modules/AuthModule/components/Login/Login'
import Register from './Modules/AuthModule/components/Register/Register'
import ResetPass from './Modules/AuthModule/components/ResetPass/ResetPass'
import ChangePass from './Modules/AuthModule/components/ChangePass/ChangePass'
import ForgetPass from './Modules/AuthModule/components/ForgetPass/ForgetPass'
import Regulations from './Modules/AuthModule/components/Regulations/Regulations'
import CheckEmail from './Modules/AuthModule/components/CheckEmail/CheckEmail'






function App() {
  const routes = createBrowserRouter([
    {
      path:'/',
      element:<AuthLayout/>,
      children:[
        {index:true , element:<Login/>},
        {path:'login' , element:<Login/>},
        {path:'register' , element:<Register/>},
         {path:'regulations' , element:<Regulations/>},
         {path:'forgetpass' , element:<ForgetPass/>},
        {path:'resetpass' , element:<ResetPass/>},
        {path:'changepass' , element:<ChangePass/>},
      ],
     
    },
    {
      path:'/checkemail' ,
       element:<CheckEmail/>

    }
  ])


  return (
    <>
  
   <RouterProvider router={routes}></RouterProvider>

      
    
    </>
  )
}

export default App

