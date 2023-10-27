import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import{ signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'
import OAuth from '../components/Oauth.jsx';


const Login = () => {
  const [formData, setFormData] = useState ({});
  const{loading, error} = useSelector(state => state.user)
  const navigate = useNavigate ();
  const dispatch = useDispatch ();
  const handleChange = e => {
    setFormData ({...formData, [e.target.id]: e.target.value});
  };
  const handleSubmit = async e => {
    e.preventDefault ();
    try {
       dispatch(signInStart());
      const response = await fetch ('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify (formData),
      });
      const data = await response.json ();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }

      dispatch(signInSuccess(data))
      navigate ('/');
    } catch (error) {
   dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="p-2 max-w-lg mx-auto mt-24">
      <h1 className="text-3xl text-center pb-2 font-semibold capitalize">
        Login
      </h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-3 rounded-md focus:outline-blue-500"
          placeholder="Username"
          onChange={handleChange}
          id="username"
        />
        <input
          type="password"
          className="border p-3 rounded-md focus:outline-blue-500"
          placeholder="Password"
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700
         text-white rounded-md p-3 uppercase disabled:opacity-90 hover:opacity-95"
        >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        <OAuth title="Sign in with Google"/>
      </form>
      <div className="flex gap-2 p-1 mt-5">
        <p>Dont have an account?</p>
        <Link to="/register">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Login;
