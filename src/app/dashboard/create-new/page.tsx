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

const scriptData = 'Did you know that approximately 350 million pizzas are sold in the United States each year? Sloths are surprisingly strong swimmers and can hold their breath for up to 40 minutes! A single sunflower can have up to 2,000 seeds. Cats can make over 100 different sounds, while dogs only make about 10. Hummingbirds can beat their wings up to 80 times per second. There are more trees on Earth than stars in the Milky Way galaxy. Elephants can remember and recognize the calls of their relatives decades after they were last heard. Some fish can change their sex to better adapt to the environment. Laughter is contagious, and it has proven health benefits. Did you know that there are over 7,000 languages spoken in the world today? '

function CreateNew() {
    const [formData, setFormData] = useState<FormData>({})
    const [loading, setLoading] = useState(false);
    const [audioFileUrl, setAudioFileUrl] = useState<string>('');
    const [videoScript, setVideoScript] = useState([]);

    const onHandleInputChange = (fieldName: string, fieldValue: string) => {
        setFormData(prev => ({ ...prev, [fieldName]: fieldValue }))
    }

    const generatePrompt = ({ topic, duration, imageStyle }: FormData): string => {
        return `Write a script to generate a ${duration} video on topic: ${topic}, along with AI image prompt in ${imageStyle} format for each scene. Give me result in JSON format with imagePrompt and ContentText as fields.`
    }

    const getVideoScript = async () => {
        setLoading(true);
        await axios.post('/api/get-video-script', {
            prompt: generatePrompt(formData)
        }).then(response => {
            setVideoScript(response.data.result)
            generateAudioFile(response.data.result);
        })
        setLoading(false)
    }

    const generateAudioFile=async (vidScript: any) => {
        if(!loading) setLoading(true);
        let script = '';
        const id = uuidv4();
        // for(let i = 0;i < vidScript.length;i++){
        //     script += vidScript[i].contentText+' ';
        // }
        await axios.post('/api/generate-audio', {
            text: scriptData,
            id: id
        }).then(response => {setAudioFileUrl(response.data.result)})
        if(loading) setLoading(false);
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
                    onClick={()=>generateAudioFile(scriptData)}
                >
                    Create Short Video
                </Button>
            </div>
            <CustomLoading loading={loading}/>
        </div>
    )
}

export default CreateNew
