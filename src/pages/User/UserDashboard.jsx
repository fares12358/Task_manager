import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'

const UserDashboard = () => {
  useUserAuth();

  return (
    <div>Dashboard</div>
  )
}

export default UserDashboard