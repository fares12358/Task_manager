export const BASE_URL = "https://task-manager-backend-orpin-three.vercel.app"
// export const BASE_URL = "http://localhost:5000"

export const API_PATHS = {
    AUTH: {
        REGISETER: '/register',
        LOGIN: "/login",
        GET_PROFILE: "/profile",
    },
    USERS: {
        GET_ALL_USERS: "/users",
        GET_USER_BY_ID: (userId) => `/users/${userId}`,
        CREATE_USER: '/users',
        UPDATE_USER: (userId) => `/users/${userId}`,
        DELETE_USER: (userId) => `/users/${userId}`,
    },
    TASKS: {
        GET_DASHBOARD_DATA: '/dashboard-data',
        GET_USER_DASHBOARD_DATA: '/user-dashboard-data',
        GET_ALL_TASKS: '/getTasks',
        GET_TASKS_BY_ID: (taskId) => `/getTasks/${taskId}`,
        CREATE_TASK: '/createTasks',
        UPDATE_TASK: (taskId) => `/createTasks/${taskId}`,
        DELETE_TASK: (taskId) => `/deleteTask/${taskId}`,

        UPDATE_TASK_STATUS: (taskId) => `/task/${taskId}/status`,
        UPDATE_TODO_CHECKLIST: (taskId) => `/task/${taskId}/todo`,
    },
    REPORTS: {
        EXPORT_TASKS: '/export/tasks',
        EXPORT_USERS: '/export/users',
    },
    IMAGE: {
        UPLOAD_IMAGE: '/upload-image',
    },
};