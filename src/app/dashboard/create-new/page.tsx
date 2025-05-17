"use client"

import { Button } from '@/components/ui/button'
import { SelectTopic } from "@/app/dashboard/create-new/_components/SelectTopic"
import { SelectStyle } from "@/app/dashboard/create-new/_components/SelectStyle"
import { SelectDuration } from "@/app/dashboard/create-new/_components/SelectDuration"
import { CustomLoading } from "@/app/dashboard/create-new/_components/CustomLoading"
import { useState } from "react"
import axios from "axios"

interface FormData {
    topic?: string
    imageStyle?: string
    duration?: string
}

function CreateNew() {
    const [formData, setFormData] = useState<FormData>({})
    const [loading, setLoading] = useState(false);
    const [videoScript, setVideoScript] = useState(null);

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
        }).then(response => {setVideoScript(response.data.result)})
        setLoading(false)
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
                    onClick={getVideoScript}
                >
                    Create Short Video
                </Button>
            </div>
            <CustomLoading loading={loading}/>
        </div>
    )
}

export default CreateNew
