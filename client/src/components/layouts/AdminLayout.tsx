import { Outlet, useNavigate } from "react-router-dom";
import { useContract } from "../../context/SmartContractProvider";
import Sidebar from "../admin/dashboard/Sidebar";

const HomeLayout = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContract();

  if (!isAdmin) {
    navigate("/");
  }

  return (
    <div className="w-screen h-screen py-12 pr-10 pl-[220px]">
      <Sidebar />
      <div className="text-center text-black font-bold text-3xl">
        This is a VOTING DAPP ADMIN PANEl
      </div>

      <Outlet />
    </div>
  );
};

export default HomeLayout;
