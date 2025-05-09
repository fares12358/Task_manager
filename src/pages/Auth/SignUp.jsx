import React, { useContext, useState } from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import { validateEmail } from '../../Utils/helper';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';
import Input from '../../Components/Inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../Utils/uploadeImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  // handle signup form
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

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
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISETER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken
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
    }
  }
  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below.</p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input value={fullName} onChange={({ target }) => setFullName(target.value)} label={"Full Name"} placeholder={"Fares"} type={"text"} />
            <Input type="text" value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="fares@example.com" />
            <Input type="password" value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 Characters" />
            <Input type="text" value={adminInviteToken} onChange={({ target }) => setAdminInviteToken(target.value)} label="Admin Invite Token" placeholder="6 Digit Code" />
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>
          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?
            <Link className='font-medium text-primary underline' to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp