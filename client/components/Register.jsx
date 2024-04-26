import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { registerUser, resetUser } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'

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
    <div>
        <Header />
      <h2>Register</h2>
      <form onSubmit={handleSubmit} method='post' action='submit' id='registerForm'>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;