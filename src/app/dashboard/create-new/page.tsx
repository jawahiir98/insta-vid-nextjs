"use client"

import {SelectTopic} from "@/app/dashboard/create-new/_components/SelectTopic";
import {SelectStyle} from "@/app/dashboard/create-new/_components/SelectStyle";
import {useState} from "react";

function CreateNew() {

        const [formData, setFormData] = useState([])
        const onHandleInputChange = (fieldName: string, fieldValue:string)=> {
            console.log(fieldName, fieldValue)
        }
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
                    {/* Create Button */}
                </div>
            </div>
        )
    }
    export default CreateNew;