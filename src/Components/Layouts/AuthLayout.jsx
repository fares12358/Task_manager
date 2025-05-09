import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className='flex'>
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
                <h2 className='text-xl font-medium text-black'>Task Manager</h2>
                {children}
            </div>
            <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50">
                <img src="/images/bg-image.png" alt="ui img" className='w-full h-full object-cover '/>
            </div>
        </div>
    )
}

export default AuthLayout