import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Login from '../components/Login/Login.component';
import { login } from '../redux/actions/authActions';

const AuthContainer: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login(name, password));
  };

  return (
    <div>
      <Login
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleLoginSubmit}
      />
    </div>
  );
};

export default AuthContainer;
