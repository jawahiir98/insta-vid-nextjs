"use client";
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import {RemotionVideo} from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db } from '@/db/drizzle';
import { VideoData } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

interface Props {
    playVideo: boolean;
    videoId: number;
}

export const PlayerDialog = ({ playVideo, videoId }: Props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState<any>();
    const [durationInFrame, setDurationInFrame] = useState(100);

    const router = useRouter();

    useEffect(() => {
        if(videoId && videoId > 0) GetVideoData();
    }, [playVideo]);
    useEffect(()=> {
        if(videoData){
            setOpenDialog(!openDialog);
        }
    },[videoData])

    const GetVideoData = async () => {
        const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
        setVideoData(result[0]);
    };

    return (
        <Dialog open={openDialog}>
            <DialogContent className="flex flex-col justify-center items-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold my-5 text-center">Your Video is ready</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo}
                            durationInFrames={Number(durationInFrame.toFixed(0))}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={60}
                            controls={true}
                            inputProps={{
                                ...videoData,
                                setDurationInFrame: (frameValue: any) => setDurationInFrame(frameValue)
                            }}
                        />

                        <div className='flex items-center justify-around mt-8'>
                            <Button variant="ghost" className="hover:scale-105 transition-all" onClick={()=> {router.replace('/dashboard'); setOpenDialog(!openDialog)}} >Cancel</Button>
                            <Button className=" hover:scale-105 hover:bg-gray-700 transition-all">Export</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
};

