import React from "react";
import {Header} from "@/app/dashboard/_components/Header";
import {SideNav} from "@/app/dashboard/_components/SideNav";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="hidden  md:block h-screen bg-white fixed mt-[70px] w-64">
        <SideNav />
      </div>
      <div>
        <Header />
        <div className={'md:ml-64'}>
            {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
