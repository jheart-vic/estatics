import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState ({});
  const [error, setError] = useState (null);
  const [loading, setLoading] = useState (false);
  const navigate = useNavigate ();
  const handleChange = e => {
    setFormData ({...formData, [e.target.id]: e.target.value});
  };
  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      const response = await fetch ('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify (formData),
      });
      const data = await response.json ();
      if (data.success === false) {
        setError (data.message);
        setLoading (false);
        return;
      }

      setLoading (false);
      setError (null);
      navigate ('/login');
      console.log (data);
    } catch (error) {
      setError (error.message);
      setLoading (false);
    }
  };

  return (
    <div className="p-2 max-w-lg mx-auto mt-24">
      <h1 className="text-3xl text-center pb-2 font-semibold capitalize">
        Create an account
      </h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="text"
          className="border p-3 rounded-md"
          placeholder="Username"
          onChange={handleChange}
          id="username"
        />
        <input
          type="email"
          className="border p-3 rounded-md"
          placeholder="Email"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          className="border p-3 rounded-md"
          placeholder="Password"
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700
         text-white rounded-md p-3 uppercase disabled:opacity-90 hover:opacity-95"
        >
          {loading ? 'Loading...' : 'Sign up'}
        </button>
      </form>
      <div className="flex gap-2 p-1 mt-5">
        <p>Have an account?</p>
        <Link to="/login">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Register;
