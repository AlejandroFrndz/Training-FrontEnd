import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../components/Login/Login.component';
import { State } from '../redux/reducers/rootReducer';
import { login } from '../redux/actions/authActions';

const AuthContainer: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const error = useSelector((state: State) => state.auth.error);
  const errorMsg = useSelector((state: State) => state.auth.msg);

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
        error={error}
        msg={errorMsg}
      />
    </div>
  );
};

export default AuthContainer;
