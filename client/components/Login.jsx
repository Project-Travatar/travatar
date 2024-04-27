import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { loginUser, resetUser } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../stylesheets/loginOrRegister.css'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.user);

  const signInWithGoogle = () => {
    window.location.href = window.origin + "/api/auth/google"
    // fetch('/api/auth/google')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('data', data);
    //     })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({email, password}));
    } catch(err) {
      console.log(err);
    }
  };

  // Toast error message handling for failed login
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(resetUser());
    }
  }, [isError]);

  // Toast message handling for successful login
  useEffect(() => {
      if (isSuccess) {
        toast.success('Login successful!');
        navigate('/');
        dispatch(resetUser());
      }
    }, [isSuccess]);

  return (
    <div className='login-registration-page' style={{height: '94vh'}}>
      <div className="flex flex-col justify-center items-center">
        <div className="login-registration-form w-3/5 border border-transparent rounded-lg pt-4 mt-20 mb-5 p-10">
          <h2 className="text-center font-bold text-white text-4xl mt-10">Login</h2>
          <form className="text-xl" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="block text-white mt-8 mb-1">
                Email Address:
              </label>
              <input type="text" value={email} placeholder="teamAvatar@gmail.com" className="input-field rounded-md border-0 py-1 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 flex-grow" onChange={(e) => setEmail(e.target.value)} />
              <label className="block text-white w-1/3 mb-1">
                Password:
              </label>
              <input type="password" value={password} placeholder="Enter your password" className="inline-block input-field rounded-md border-0 py-1 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-8 flex-grow" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="block text-white border border-blue-500 bg-blue-500 hover:bg-blue-600 bg-opacity-90 hover:text-slate-400 rounded-md py-2 ml-auto rounded-full px-8">Login</button>
          </form>
          <div className="oauth-container flex mt-20">
            <button type="button" onClick={signInWithGoogle} className="block text-white border border-slate-400 bg-slate-400 bg-opacity-60 hover:bg-slate-600 hover:text-slate-400 rounded-md py-2 rounded-full px-12 text-xl">G OAuth</button>
            <button type="button" onClick={() => console.log('Facebook Oauth clicked!')} className="block text-white border border-slate-400 bg-slate-400 bg-opacity-60 hover:bg-slate-600 hover:text-slate-400 rounded-md py-2 ml-auto rounded-full px-12 text-xl">F OAuth</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;