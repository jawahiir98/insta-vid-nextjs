import React from "react";
import {Header} from "./_components/Header";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="">
        <Header />
      </div>
      <div className="">{children}</div>
    </div>
  );
}

export default DashboardLayout;
