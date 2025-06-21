const RegistrationForm = () => {
  return (
    <form className="flex flex-col my-6">
      <div className="flex flex-col gap-2 my-2">
        <label htmlFor="fname">First Name</label>
        <input className="border border-black/20 rounded-md px-4 py-2" type="text" name="fname" id="fname" />
      </div>

      <div className="flex flex-col gap-2 my-2">
        <label htmlFor="lname">Last Name</label>
        <input className="border border-black/20 rounded-md px-4 py-2" type="text" name="lname" id="lname" />
      </div>

      <div className="flex flex-col gap-2 my-2">
        <label htmlFor="email">Email Address</label>
        <input className="border border-black/20 rounded-md px-4 py-2" type="email" name="email" id="email" />
      </div>

      <div className="flex flex-col gap-2 my-2">
        <label htmlFor="password">Password</label>
        <input className="border border-black/20 rounded-md px-4 py-2" type="password" name="password" id="password" />
      </div>

      <button type="submit" className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all w-full mt-4">
        Create account
      </button>
    </form>
  );
};

export default RegistrationForm;
