"use client"

import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {EmptyState} from "@/app/dashboard/_components/EmptyState"
import {useUser} from "@clerk/nextjs"
import {db} from "@/db/drizzle" // adjust to your db import
import {VideoData} from "@/db/schema" // adjust to your schema
import {eq} from "drizzle-orm"
import {VideoList} from "@/app/dashboard/_components/VideoList";

function Dashboard() {
    const {user} = useUser()
    const [loading, setLoading] = useState(true)
    const [videoList, setVideoList] = useState([])

    useEffect(() => {
        if (!user) return

        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await db
                    .select()
                    .from(VideoData)
                    .where(eq(VideoData.createdBy, user?.primaryEmailAddress?.emailAddress || ""))
                setVideoList(result)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user])

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <Link href="/dashboard/create-new">
                    <Button>+ Create New</Button>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
                </div>
            ) : videoList.length === 0 ? (
                <EmptyState />
            ) : (
                <div>
                    <VideoList videoList={videoList} />
                </div>
            )}
        </div>
    )
}

export default Dashboard
