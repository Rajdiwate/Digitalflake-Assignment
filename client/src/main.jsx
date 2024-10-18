import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Desktop from './components/Desktop.jsx';
import Home from './components/Home.jsx';
import Users from './components/Users.jsx';
import Roles from './components/Roles.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import { LogoutProvider } from './context/logoutContext.jsx';
import Protected from './components/AuthLayout.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { DeleteProvider } from './context/deleteContext.jsx';
import EditRole from './components/UpdateRole.jsx';
import AddRole from './components/AddRole.jsx';
import AddUser from './components/AddUser.jsx';
import EditUser from './components/EditUser.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Desktop />,
  },
  {
    path: "/",
    element: (<App />),
    children: [
      {
        path: "/home",
        element: (<Protected><Home /></Protected>)
      },
      {
        path: "/users",
        element: (<Protected><Users /></Protected>)
      },
      {
        path: "/roles",
        element: (<Protected><Roles /></Protected>),
      },
      {
        path : "/roles/edit/:id",
        element: (<Protected><EditRole/></Protected>)
      },{
        path : "/roles/add",
        element : (<Protected><AddRole/></Protected>)
      },
      {
        path : "/user/add",
        element : (<Protected><AddUser/></Protected>)
      },
      {
        path : "user/edit/:id",
        element : (<Protected><EditUser/></Protected>)
      }

    ]
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path : '/temporary',
    element : <>Loading...</>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <DeleteProvider>
        <LogoutProvider>
          <RouterProvider router={router} />
        </LogoutProvider>
      </DeleteProvider>
    </Provider>
  </StrictMode>,
)
