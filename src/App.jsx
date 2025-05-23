import React, { useContext } from 'react'
import { Toaster } from "react-hot-toast"
import {
  BrowserRouter as Router, Routes, Route,
  Outlet,
  Navigate
} from "react-router-dom";
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Dashborad from './pages/Admin/Dashboard'
import UserDashboard from './pages/User/UserDashboard'
import ManageTasks from './pages/Admin/ManageTasks';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
import PrivateRoutes from './routes/PrivateRoutes';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';
import UserProvider, { UserContext } from './context/userContext';
const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            {/* admin routes */}
            <Route element={<PrivateRoutes allowedRoles={['admin']} />}>
              <Route path='/admin/dashboard' element={<Dashborad />} />
              <Route path='/admin/tasks' element={<ManageTasks />} />
              <Route path='/admin/create-task' element={<CreateTask />} />
              <Route path='/admin/users' element={<ManageUsers />} />
            </Route>
            {/* user routes */}
            <Route element={<PrivateRoutes allowedRoles={['admin']} />}>
              <Route path='/user/dashboard' element={<UserDashboard />} />
              <Route path='/user/tasks' element={<MyTasks />} />
              <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />
            </Route>
            {/* default routes */}
            <Route path='/' element={<Root />} />
          </Routes>
        </Router>
        <Toaster
          toastOptions={{
            className: '',
            style: {
              fontSize: "13px",
            }
          }}
        />
      </div>
    </UserProvider>
  )
}

export default App

const Root = () => {
  const { user, loading } = useContext(UserContext);
  if (loading) return <Outlet />
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return user.role === "admin" ? <Navigate to={'/admin/dashboard'} /> : <Navigate to={'/user/dashboard'} />;
}