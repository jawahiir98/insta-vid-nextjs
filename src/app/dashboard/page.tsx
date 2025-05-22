"use client"

import {useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {EmptyState} from "@/app/dashboard/_components/EmptyState";

function Dashboard() {
    const [videoList, setVideoList] = useState([])
  return (
    <div>
      <div className="flex items-center justify-between">
          <h2 className={'text-2xl font-semibold'}>Dashboard</h2>
          <Link href='/dashboard/create-new'>
              <Button>+ Create New</Button>
          </Link>
      </div>
        {videoList?.length === 0 && (
            <EmptyState />
        )}
    </div>
  );
}

export default Dashboard;
