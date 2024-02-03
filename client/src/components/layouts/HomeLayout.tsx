import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="w-screen h-screen py-12 px-10">
      <div className="text-center text-black font-bold text-3xl">
        This is a VOTING DAPP
      </div>

      <Outlet />
    </div>
  );
};

export default HomeLayout;
