import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom';

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();
  const getAllTasks =async ()=>{

  }
  const handleClick =(taskData)=>{
    navigate('/admin/create-task',{state:{taskId: taskData._id}});
  };
  const handleDownloadReport =async ()=>{

  }
  useEffect(() => {
    getAllTasks(filterStatus);
    return ()=>{};
  }, [filterStatus]);
  
  return (
    <DashboardLayout activeMenu={'Manage Tasks'}>ManageTasks</DashboardLayout>
  )
}

export default ManageTasks