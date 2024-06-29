const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Journal</h1>
      </div>
      <h1>Home</h1>
      <div>
        <button className="px-4 py-2 outline-blac rounded-xl">Sign in</button>
      </div>
    </div>
  );
};
export default Navbar;
