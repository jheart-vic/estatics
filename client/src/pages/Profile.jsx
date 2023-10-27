import {useSelector} from 'react-redux';
const Profile = () => {
  const {currentUser} = useSelector (state => state.user);
  return (
    <div className="p-2 max-w-lg mx-auto mt-24">
      <h1 className="text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 object-cover mt-2 cursor-pointer self-center"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="p-3  rounded-md border focus:outline-blue-500"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="p-3  rounded-md border focus:outline-blue-500"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-3  rounded-md border focus:outline-blue-500"
        />
      <button className="bg-slate-700
         text-white rounded-md p-3 uppercase disabled:opacity-90 hover:opacity-95">
        Update
      </button>
      </form>
<div className="flex justify-between mt-5">
<span className="text-red-700 cursor-pointer hover:bg-red-900 hover:text-white hover:p-1 hover:rounded-md">Delete Account</span>
<span className="text-red-700 cursor-pointer hover:bg-red-900 hover:text-white hover:p-1 hover:rounded-md">Sign Out</span>
</div>
    </div>
  );
};

export default Profile;
