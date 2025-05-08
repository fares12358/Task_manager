import React, { useState } from 'react';
import AuthLayout from '../../Components/Layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../Components/Inputs/Input';
import { validateEmail } from '../../Utils/helper';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  // handle validation
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, password
      });
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
      else {
        setError("Something went wrong. Please try again later.")
      }
    }
  }



  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          PLease enter your details to log in
        </p>
        <form onSubmit={handleLogin}>
          <Input type="text" value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="fares@example.com" />
          <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 Characters" />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>
            LOGIN
          </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{' '}
            <Link className='font-medium text-primary underline' to={"/signup"}>SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>

  );
};

export default Login;
