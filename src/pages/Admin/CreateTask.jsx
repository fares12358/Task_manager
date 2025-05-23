import React from 'react';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import { LuTrash2 } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PRIORITY_DATA } from '../../Utils/data';
import SelectDropdown from '../../Components/Inputs/SelectDropdown';
import SelectUsers from '../../Components/Inputs/SelectUsers';
import TodoListInput from '../../Components/Inputs/TodoListInput';
import AddAttachmentsInput from '../../Components/Inputs/AddAttachmentsInput';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { toast } from 'react-hot-toast';

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  }

  const clearData = () => {
    setTaskData({
      title: '',
      description: '',
      priority: 'Low',
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }

  const createTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));
      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      });
      toast.success("Task Created Successfully");
      clearData();
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const updateTask = async () => { };

  const handleSubmit = async () => {
    setError(null);
    if (!taskData.title.trim()) {
      setError("Title is required!")
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due date is required!")
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any member");
      return;
    }
    if (taskData.todoChecklist?.length === 0) {
      setError("Add atleast one todo task");
      return;
    }
    if (taskId) {
      updateTask();
      return;
    }
    createTask();
  };

  const getTaskDetailsByID = async () => { };
  const deteteTask = async () => { };


  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-center">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {
                taskId && (
                  <button
                    className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer'
                    onClick={() => { setOpenDeleteAlert(true) }}>
                    <LuTrash2 className='text-base' />
                    Delete
                  </button>
                )
              }
            </div>
            <div className="mt-4">
              <label htmlFor="" className="text-xs font-medium text-slate-600">Task Title</label>
              <input
                type="text"
                className='form-input'
                value={taskData.title}
                onChange={({ target }) => handleValueChange("title", target.value)}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="" className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                name="Describe task"
                id=""
                className='form-input '
                placeholder="Describe task"
                rows={4}
                value={taskData.description}
                onChange={({ target }) => handleValueChange("description", target.value)}
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-4">
              <div className="col-span-6 md:col-span-4">
                <label htmlFor="" className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>
              <div className="col-span-6 md:col-span-4">
                <label htmlFor="" className="text-xs font-medium text-slate-600">Due Date</label>
                <input type="date" placeholder='Create App UI' className='form-input' value={taskData.dueDate} onChange={({ target }) => { handleValueChange("dueDate", target.value) }} />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label htmlFor="" className="text-xs font-medium text-slate-600">Assign To</label>
                <SelectUsers selectUsers={taskData.assignedTo} setSelectedUsers={(value) => { handleValueChange("assignedTo", value) }} />
              </div>

            </div>
            <div className="mt-3">
              <label htmlFor="" className="text-xs font-medium text-slate-600">TODO Checklist</label>
              <TodoListInput todoList={taskData?.todoChecklist} setTodoList={(value) => handleValueChange("todoChecklist", value)} />
            </div>
            <div className="mt-3">
              <label htmlFor="" className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttachmentsInput attachments={taskData.attachments}
                setAttachments={(value) => (
                  handleValueChange("attachments", value)
                )}
              />

            </div>
            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}
            <div className="flex justify-end mt-7">
              <button className='add-btn' onClick={handleSubmit} disabled={loading}>
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask