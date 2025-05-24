"use client"

import {useContext, useEffect, useState} from "react"
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button'
import { SelectTopic } from "@/app/dashboard/create-new/_components/SelectTopic"
import { SelectStyle } from "@/app/dashboard/create-new/_components/SelectStyle"
import { SelectDuration } from "@/app/dashboard/create-new/_components/SelectDuration"
import { CustomLoading } from "@/app/dashboard/create-new/_components/CustomLoading"
import {VideoDataContext} from "@/app/_context/videoDataContext";
import { db } from "@/db/drizzle";
import {Users, VideoData} from "@/db/schema";
import {PlayerDialog} from "@/app/dashboard/_components/PlayerDialog";
import {eq} from "drizzle-orm";
import {toast} from "sonner";

interface FormData {
    topic?: string
    imageStyle?: string
    duration?: string
}

function CreateNew() {
    const [formData, setFormData] = useState<FormData>({})
    const [loading, setLoading] = useState(false);
    const [playVideo, setPlayVideo] = useState(true);
    const [videoId, setVideoId] = useState();
    const {user} = useUser();
    const {userDetail, setUserDetail} = useContext(VideoDataContext);
    const { videoData, setVideoData } = useContext(VideoDataContext);

    const onHandleInputChange = (fieldName: string, fieldValue: string) => {
        setFormData(prev => ({ ...prev, [fieldName]: fieldValue }))
    }

    const updateUserCredits = async () => {
        const result = await db.update(Users).set({ credits: userDetail?.credits - 10 })
            .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))
            .returning({ id: Users.id });

        console.log(result);
        setUserDetail((prev:any): any => ({
            ...prev,
            'credits': userDetail?.credits - 10
        }));
        setVideoData(null);
    };

    /*
    *   Generate custom prompt string using a template and the input values
    */
    const generatePrompt = ({ topic, duration, imageStyle }: FormData): string => {
        return `Write a script to generate a ${duration} video on topic: ${topic}, along with AI image prompt in ${imageStyle} format for each scene. Give me result in JSON format with imagePrompt and ContentText as fields.`
    }

    const onGenerateVideoCreation = async () => {
        if(userDetail?.credits < 10){
            toast.error('You do not have enough credits to create a video');
        }
        await getVideoScript();
    }

    /*
    *  Generate script for the video with Gemini AI
    */
    const getVideoScript = async () => {
        setLoading(true);
        const response = await axios.post('/api/get-video-script', {
            prompt: generatePrompt(formData)
        })
        if(response.data.result){
            setVideoData((prev:FormData) => ({
                ...prev,
                'videoScript': response.data.result
            }))
            await generateAudioFile(response.data.result)
        }
    }

    /*
    *  Generate audio based the generated script and save it to Firebase Storage using Google Text-to-Speech AI
    */
    const generateAudioFile=async (vidScript: any) => {
        let script = '';
        const id = uuidv4();
        for(let i = 0;i < vidScript.length;i++){
            script += vidScript[i].contentText+' ';
        }
        const response = await axios.post('/api/generate-audio', {
            text: script,
            id: id
        })
        if(response.data.result){
            setVideoData((prev: FormData) => ({
                ...prev,
                'audioFileUrl': response.data.result
            }))
            await generateAudioCaptions(response.data.result, vidScript);
        }
    }

    /*
    *  Generate captions using Assembly AI based on the generated audio ( MP3 )
    */
    const generateAudioCaptions = async(fileUrl: string, vidScript: any) => {
        const response = await axios.post('/api/generate-caption', {
            audioFileUrl: fileUrl,
        })
        if(response.data.result){
            setVideoData((prev: FormData)=> ({
                ...prev,
                'captions': response.data.result
            }))
            await generateImage(vidScript);
        }
    }

    /*
    *  Generate images using SDXL 4-step Lightning model from Replicate and save it to Firebase storage.
    */
    const generateImage = async (vidScript: any[]) => {
        const imageList: any[] = [];

        for (const element of vidScript) {
            try {
                const res = await axios.post('/api/generate-image', {
                    prompt: element?.imagePrompt
                });
                imageList.push(res.data.downloadUrl);
            } catch (error) {
                console.log('Error:' + error);
            }
        }

        setVideoData((prev: FormData)=> ({
            ...prev,
            'imageList': imageList
        })); setLoading(false);
    }

    useEffect(() => {
        console.log(videoData);
        if(videoData && Object.keys(videoData).length === 4){
             saveVideoData(videoData);
        }
    }, [videoData]);

    const saveVideoData = async (videoData: any) => {
        setLoading(true);
        const result = await db.insert(VideoData).values({
            videoScript: videoData?.videoScript,
            audioFileUrl: videoData?.audioFileUrl,
            captions: videoData?.captions,
            imageList: videoData?.imageList,
            createdBy: user?.primaryEmailAddress?.emailAddress
        }).returning({id: VideoData?.id})
        setVideoId(result[0].id);
        await updateUserCredits();
        setPlayVideo(true);
        setLoading(false);
    }

    return (
        <div className="md:px-20">
            <h2 className="font-bold text-3xl text-center">Create new video</h2>
            <div className="mt-10 rounded-xl shadow-md p-10">
                <SelectTopic onUserSelect={onHandleInputChange}/>
                <SelectStyle onUserSelect={onHandleInputChange}/>
                <SelectDuration onUserSelect={onHandleInputChange}/>
                <Button
                    className="w-full mt-8"
                    onClick={onGenerateVideoCreation}
                >
                    Create Short Video
                </Button>
                <h3 className='text-center text-yellow-800'>10 Credits Per Video</h3>
            </div>
            <CustomLoading loading={loading}/>
            <PlayerDialog playVideo={playVideo} videoId={videoId} />
        </div>
    )
}

export default CreateNew
