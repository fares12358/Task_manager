import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';

const Dashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setpieChartData] = useState([]);
  const [berChartData, setBerChartData] = useState([]);

  const getdDashboardData = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (res.data) {
        setDashboardData(res.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getdDashboardData();
    return () => { }
  }, [])
  return (
    <DashboardLayout activeMenu="Dashboard">
      {JSON.stringify(dashboardData)}
    </DashboardLayout>
  )
}

export default Dashboard