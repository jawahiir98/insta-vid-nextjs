"use client"

import { Button } from '@/components/ui/button'
import { SelectTopic } from "@/app/dashboard/create-new/_components/SelectTopic"
import { SelectStyle } from "@/app/dashboard/create-new/_components/SelectStyle"
import { SelectDuration } from "@/app/dashboard/create-new/_components/SelectDuration"
import { CustomLoading } from "@/app/dashboard/create-new/_components/CustomLoading"
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react"
import axios from "axios"

interface FormData {
    topic?: string
    imageStyle?: string
    duration?: string
}
interface Script{
    imagePrompt: string;
    contentText: string;
}

const scriptData = 'Did you know that approximately 350 million pizzas are sold in the United States each year? Sloths are surprisingly strong swimmers and can hold their breath for up to 40 minutes! A single sunflower can have up to 2,000 seeds. Cats can make over 100 different sounds, while dogs only make about 10. Hummingbirds can beat their wings up to 80 times per second. There are more trees on Earth than stars in the Milky Way galaxy. Elephants can remember and recognize the calls of their relatives decades after they were last heard. Some fish can change their sex to better adapt to the environment. Laughter is contagious, and it has proven health benefits. Did you know that there are over 7,000 languages spoken in the world today? '
const audioFileUrlData ='https://firebasestorage.googleapis.com/v0/b/insta-vid-e0e16.firebasestorage.app/o/insta-vid%2F129b51d5-b858-497b-afd9-be61b50c92d4.mp3?alt=media&token=7796794e-1e5a-4554-b841-4dd67a7821ef'
const promptData =[
    {
        "imagePrompt": "A bustling medieval marketplace, filled with people buying and selling goods. There are colorful stalls, carts, and a lively atmosphere. The sun shines brightly overhead.",
        "contentText": "In the heart of 14th century Europe, a young woman named Joan of Arc was born into a humble peasant family. She was known for her devout faith and her strong sense of justice."
    },
    {
        "imagePrompt": "Joan of Arc, a young woman dressed in simple peasant clothing, looking determined and filled with a sense of purpose. She stands in a field, surrounded by lush greenery.",
        "contentText": "As a teenager, Joan began to have visions and hear voices that she believed were from God. These voices instructed her to save France from English rule."
    },
    {
        "imagePrompt": "Joan of Arc leading a small army of French soldiers, confidently marching towards the battlefield, a white flag bearing a cross fluttering in the wind.",
        "contentText": "With unwavering faith, Joan rallied the French troops and led them to victory in several important battles."
    },
]


function CreateNew() {
    const [formData, setFormData] = useState<FormData>({})
    const [loading, setLoading] = useState(false);
    const [audioFileUrl, setAudioFileUrl] = useState<string>('');
    const [videoScript, setVideoScript] = useState<Script[]>(promptData);
    const [captions, setCaptions] = useState([]);
    const [images, setImages] = useState([]);

    const onHandleInputChange = (fieldName: string, fieldValue: string) => {
        setFormData(prev => ({ ...prev, [fieldName]: fieldValue }))
    }

    const generatePrompt = ({ topic, duration, imageStyle }: FormData): string => {
        return `Write a script to generate a ${duration} video on topic: ${topic}, along with AI image prompt in ${imageStyle} format for each scene. Give me result in JSON format with imagePrompt and ContentText as fields.`
    }

    const onGenerateVideoCreation = async() => {
        setLoading(true);
        await getVideoScript();
        setLoading(false);
    }

    /*
    *  Generate script for the video with Gemini AI
    */
    const getVideoScript = async () => {
        await axios.post('/api/get-video-script', {
            prompt: generatePrompt(formData)
        }).then(response => {
            setVideoScript(response.data.result)
            if(response.data.result){generateAudioFile(response.data.result);}
        })
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
        await axios.post('/api/generate-audio', {
            text: script,
            id: id
        }).then(response => {
            setAudioFileUrl(response.data.result);
            if(response.data.result){generateAudioCaptions(response.data.result, vidScript);}
        })
    }

    /*
    *  Generate captions using Assembly AI based on the generated audio ( MP3 )
    */
    const generateAudioCaptions = async(fileUrl: string, vidScript: any) => {
        await axios.post('/api/generate-caption', {
            audioFileUrl: fileUrl,
        }).then(response => {
            setCaptions(response.data.result);
            if(response.data.result){ generateImage(vidScript);}
        })
    }

    /*
    *  Generate images using SDXL 4-step Lightning model from Replicate and save it to Firebase storage.
    */
    const generateImage = async (vidScript: any[]) => {
        try {
            const imageList: string[] = []

            for (const element of vidScript) {
                const response = await axios.post('/api/generate-image', {
                    prompt: element?.imagePrompt
                })
                if (response.data?.result) {
                    imageList.push(response.data.result)
                }
            }

            setImages(imageList)
            console.log("Generated images:", imageList, videoScript, audioFileUrl, captions)
        } catch (err) {
            console.error("Image generation error:", err)
        }
    }

    return (
        <div className="md:px-20">
            <h2 className="font-bold text-3xl text-center">Create new video</h2>
            <div className="mt-10 rounded-xl shadow-md p-10">
                <SelectTopic onUserSelect={onHandleInputChange} />
                <SelectStyle onUserSelect={onHandleInputChange} />
                <SelectDuration onUserSelect={onHandleInputChange} />
                <Button
                    className="w-full mt-8"
                    onClick={onGenerateVideoCreation}
                >
                    Create Short Video
                </Button>
            </div>
            <CustomLoading loading={loading}/>
        </div>
    )
}

export default CreateNew
