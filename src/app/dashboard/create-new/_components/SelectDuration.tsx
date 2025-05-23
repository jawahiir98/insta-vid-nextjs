"use client"

import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {useState} from "react";

interface Props {
    onUserSelect: (fieldName: string, fieldValue: string) => void;
}

export const SelectDuration = ({ onUserSelect }: Props) => {
    return (
        <div className={'mt-6'}>
            <h2 className={'font-semibold text-xl'}>Duration</h2>
            <p className={'text-gray-500 text-sm font-medium '}>Select the duration of the video</p>
            <Select onValueChange={(value) => {
                onUserSelect('duration', value);
            }}>
                <SelectTrigger className={'w-full mt-2 p-4 text-lg'}>
                    <SelectValue placeholder={'Duration'}/>
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value={'15 seconds'}>15 Seconds</SelectItem>
                    <SelectItem value={'30 seconds'}>30 Seconds</SelectItem>
                    <SelectItem value={'60 seconds'}>60 Seconds</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}