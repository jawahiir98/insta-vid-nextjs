"use client"

import {Button} from '@/components/ui/button'
import {SelectTopic} from "@/app/dashboard/create-new/_components/SelectTopic";
import {SelectStyle} from "@/app/dashboard/create-new/_components/SelectStyle";
import {SelectDuration} from "@/app/dashboard/create-new/_components/SelectDuration";
import {useState} from "react";

function CreateNew() {

        const [formData, setFormData] = useState([])
        const onHandleInputChange = (fieldName: string, fieldValue:string)=> {
            setFormData(prev => ({...prev, [fieldName]: fieldValue}))
        }
        console.log(formData)
        return(
            <div className={'md:px-20'}>
                <h2 className="font-bold text-3xl text-center">
                    Create new video
                </h2>
                <div className="mt-10 rounded-xl shadow-md p-10">
                    {/* Select topic */}
                    <SelectTopic onUserSelect={onHandleInputChange}/>
                    {/* Select style */}
                    <SelectStyle onUserSelect={onHandleInputChange}/>
                    {/* Duration */}
                    <SelectDuration onUserSelect={onHandleInputChange}/>
                    {/* Create Button */}
                    <Button className={'w-full mt-8'}>Create Short Video </Button>
                </div>
            </div>
        )
    }
    export default CreateNew;