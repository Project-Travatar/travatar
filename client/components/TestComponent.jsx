import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TestComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [test, setTest] = useState('Test Component');

  return (
    <div>
      <h1>testing test</h1>
    </div>
  )
};

export default TestComponent;