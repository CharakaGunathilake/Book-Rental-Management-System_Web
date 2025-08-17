import { Outlet } from "react-router-dom";
import SideBarLayout from "./SideBarLayout";

export const DashBoardLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBarLayout>
        <Outlet />
      </SideBarLayout>
    </div>
  );
};
