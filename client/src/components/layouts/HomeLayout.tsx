import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <div>This is Home Public Layout</div>

      <Outlet />
    </>
  );
};

export default HomeLayout;
