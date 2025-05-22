"use client"

import React,{useState, useEffect} from "react";
import {Header} from "@/app/dashboard/_components/Header";
import {SideNav} from "@/app/dashboard/_components/SideNav";
import {VideoDataContext} from "@/app/_context/videoDataContext"
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/db/drizzle";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import {useUser} from "@clerk/nextjs";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [videoData, setVideoData] = useState();
  const [userDetail, setUserDetail] = useState();
  const {user} = useUser();
  const getUserDetail = async () => {
      const result = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
      setUserDetail(result[0]);
  }

    useEffect(() => {
        getUserDetail();
    }, [user]);

  return (
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
          <VideoDataContext.Provider value={{videoData,setVideoData}}>
              <div>
                  <div className="hidden  md:block h-screen bg-white fixed mt-[70px] w-64">
                      <SideNav/>
                  </div>
                  <div>
                      <Header/>
                      <div className={'md:ml-64 p-10'}>
                          {children}
                      </div>
                  </div>
              </div>
          </VideoDataContext.Provider>
      </UserDetailContext.Provider>
  );
}

export default DashboardLayout;
