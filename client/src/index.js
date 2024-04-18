import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { ViewTask } from './pages/ViewTasks';
import { CreateList } from './pages/CreateList';
import { AssignTask } from './pages/AssignTask';
import { ViewUserInfo } from './pages/ViewUserInfo';
import { EditUseInfo } from './pages/EditUserInfo';


const router = new createBrowserRouter([
  {
    path:"/",
    element: <Homepage/>,
    children: [
      {
        path: ":create-list",
        element: <CreateList/>,
      }
    ]
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
  {
    path: "/sign-in",
    element: <SignIn/>
  },
  {
    path: "/view-task/:listId",
    element: <ViewTask/>,
  },
  {
    path: "/view-my-profile",
    element: <ViewUserInfo/>,
  }, 
  {
    path: "/edit-my-profile",
    element: <EditUseInfo/>,
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
