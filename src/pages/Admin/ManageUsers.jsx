import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import UserCard from '../../Components/Cards/UserCard'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { toast } from 'react-hot-toast';
import Loading from '../../Components/Loading'

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (res.data?.length > 0) {
        setAllUsers(res.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }
  const handleDownloadReport = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading expense details:", err);
      toast.error("Failed to download expense details. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllUsers();
    return () => { }
  }, [])

  return (
    <DashboardLayout activeMenu={"Team Members"}>
      {
        loading ? <Loading /> : <>

          <div className="mt-5 mb-10">
            <div className="flex md:flex-row md:items-center justify-between">
              <h2 className='text-xl md:text-xl font-medium'>
                Team Members
              </h2>
              <button className='flex md:flex download-btn' onClick={handleDownloadReport}>
                <LuFileSpreadsheet className='text-lg' />
                Download Report
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {allUsers?.map((user) => (
                <UserCard key={user._id} userInfo={user} />
              ))}
            </div>
          </div>
        </>
      }
    </DashboardLayout>
  )
}

export default ManageUsers