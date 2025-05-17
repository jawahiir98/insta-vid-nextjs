"use client"

import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";

interface Props {
    onUserSelect: (fieldName: string, fieldValue: string) => void;
}

export const SelectTopic = ({ onUserSelect }: Props) => {
    const options = ['Custom Prompt', 'Random AI Stories', 'Thriller', 'Comedy', 'Fun Facts', 'Bed Time Story']
    const [selectOption,setSelectOption] = useState('');
    return (
        <div>
            <h2 className={'font-semibold text-xl'}>Content</h2>
            <p className={'text-gray-500 text-sm font-medium '}>Video description</p>
            <Select onValueChange={(value) => {
                setSelectOption(value)
                if (selectOption !== 'Custom Prompt') {
                    onUserSelect('topic', value);
                }
            }}>
                <SelectTrigger className={'w-full mt-2 p-4 text-lg'}>
                    <SelectValue placeholder={'content type'}/>
                </SelectTrigger>
                <SelectContent >
                    {
                        options.map((item,index) => (
                            <SelectItem key={index } value={item}>{item}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            {
                selectOption === 'Custom Prompt' && (
                   <Textarea onChange={(e)=>onUserSelect('topic', e.target.value)} className={'mt-4'} placeholder={'Describe what kind of video do you want to generate'}/>
                )
            }
        </div>
    )
}