import React from 'react'
import {
  BrowserRouter as Router, Routes, Route
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
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {/* admin routes */}
          <Route element={<PrivateRoutes allowedRoles={['admin']} />}>
            <Route path='/admin/dashboard' element={<Dashborad />} />
            <Route path='/admin/tasks' element={<ManageTasks />} />
            <Route path='/admin/create-tasks' element={<CreateTask />} />
            <Route path='/admin/users' element={<ManageUsers />} />
          </Route>
          {/* user routes */}
          <Route element={<PrivateRoutes allowedRoles={['admin']} />}>
            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/user/tasks' element={<MyTasks />} />
            <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />
          </Route>
        </Routes>
      </Router>

      

    </div>
  )
}

export default App