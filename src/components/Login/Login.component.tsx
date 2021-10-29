import React from 'react';

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  error: boolean;
  msg: string;
}
const Login: React.FC<Props> = (props) => {
  const { name, setName, password, setPassword, handleSubmit, error, msg } =
    props;
  return (
    <div>
      <form onSubmit={handleSubmit} className="container">
        {error ? (
          <div className="row">
            <div
              className="alert alert-danger text-center text-capitalize"
              role="alert"
            >
              {msg}
            </div>
          </div>
        ) : null}

        <div className="row mb-4">
          <div className="col-4" />
          <div className="form-group mb-2 col-4 text-center">
            <label htmlFor="name" className="ps-1 pe-1 h4">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              id="name"
              name="name"
              className="form-control"
              required
              value={name}
              onChange={(target) => setName(target.currentTarget.value)}
            />
            <div className="col-4" />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-4" />
          <div className="form-group mb-2 col-4 text-center">
            <label htmlFor="pass" className="ps-1 pe-1 h4">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              id="pass"
              name="pass"
              className="form-control"
              required
              value={password}
              onChange={(target) => setPassword(target.currentTarget.value)}
            />
            <div className="col-4" />
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-success btn-lg"
              id="submitButton"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
