import { Outlet, useNavigate } from "react-router-dom";
import { useContract } from "../../context/SmartContractProvider";

const HomeLayout = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContract();

  if (!isAdmin) {
    navigate("/");
  }

  return (
    <div className="w-screen h-screen py-12 px-10">
      <div className="text-center text-black font-bold text-3xl">
        This is a VOTING DAPP ADMIN PANEl
      </div>

      <Outlet />
    </div>
  );
};

export default HomeLayout;
