import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const OAuth = ({title}) => {
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider ();
      const auth = getAuth (app);
      const result = await signInWithPopup (auth, provider);
      const res = await fetch ('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json ();
      dispatch (signInSuccess (data));
      navigate ('/');
    } catch (error) {
      console.log (error, "can't connect with google");
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-500 text-white p-3 rounded-md uppercase "
    >
      {title}
    </button>
  );
};

export default OAuth;
