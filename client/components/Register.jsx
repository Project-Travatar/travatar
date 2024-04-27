import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { registerUser, resetUser } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../stylesheets/loginOrRegister.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({firstName, lastName, email, password}))
    } catch (err) {
      console.log(err);
    }
  };

  // Toast error message handling for failed registration
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(resetUser());
    }
  }, [isError]);

  // Toast message handling for successful registration
  useEffect(() => {
    if (isSuccess) {
      toast.success('Registration & login successful!');
      navigate('/');
      dispatch(resetUser());
    }
  }, [isSuccess]);


  return (
    <div className='login-registration-page'>
      <div className="flex flex-col justify-center items-center">
      <div className="login-registration-form w-3/5 border border-transparent rounded-lg pt-4 mt-20 mb-5 p-10">
      <h2 className="text-center font-bold text-white text-4xl mt-10">Register</h2>
      <form className="text-xl" onSubmit={handleSubmit} method='post' action='submit' id='registerForm'>
      <div className="flex flex-col">
        <label className="block text-white mt-8 mb-1">
          First Name:
        </label>
        <input type="text" value={firstName} placeholder="John" className="input-field rounded-md border-0 py-1 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 flex-grow" onChange={(e) => setFirstName(e.target.value)} />
        <label className="block text-white w-1/3 mb-1">
          Last Name:
        </label>
        <input type="text" value={lastName} placeholder="Doe" className="inline-block input-field rounded-md border-0 py-1 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 flex-grow" onChange={(e) => setLastName(e.target.value)} />
        <label className="block text-white w-1/3 mb-1">
          Email:
        </label>
        <input type="text" value={email} placeholder="johndoe@gmail.com" className="inline-block input-field rounded-md border-0 py-1 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 flex-grow" onChange={(e) => setEmail(e.target.value)} />
        <label className="block text-white w-1/3 mb-1">
          Password:
        </label>
          <input type="password" value={password} placeholder="Enter your password" className="inline-block input-field rounded-md border-0 py-1 px-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-8 flex-grow" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="block text-white border border-blue-500 bg-blue-500 hover:bg-blue-600 bg-opacity-90 hover:text-slate-400 rounded-md py-2 ml-auto rounded-full px-8">Register</button>
      </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Register;