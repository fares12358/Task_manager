import React, { useContext, useState } from 'react';
import AuthLayout from '../../Components/Layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../Components/Inputs/Input';
import { validateEmail } from '../../Utils/helper';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../context/userContext';
import BtnLoader from '../../Components/BtnLoader';

const Login = () => {
  const [email, setEmail] = useState('fm883254@gmail.com');
  const [password, setPassword] = useState('fares123')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false)
  const { updateUser } = useContext(UserContext)
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
      setLoading(true);
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, password
      });
      const { token, role } = response.data;
      console.log(response.data);

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
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
    } finally {
      setLoading(false)
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
          <button type='submit' className={`${ Loading? "relative flex items-center justify-center h-[50px]  w-full border bg-slate-100/50 border-slate-300 rounded-sm":"btn-primary"}`}>
            {
              Loading ?
                <BtnLoader />
                :
                'LOGIN'
            }
          </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?
            <Link className='font-medium text-primary underline' to={"/signup"}>SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>

  );
};

export default Login;
