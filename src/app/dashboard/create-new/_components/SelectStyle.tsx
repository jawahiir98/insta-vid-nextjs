"use client"

import {useState} from 'react';
import Image from 'next/image';


interface Props {
    onUserSelect: (fieldName: string, fieldValue: string) => void;
}

export const SelectStyle = ({onUserSelect}: Props) => {
    const styleOptions = [
        { name: 'Realistic', image: '/real.png' },
        { name: 'Cartoon', image: '/cartoon.png' },
        { name: 'WaterColor', image: '/watercolor.png' },
        { name: 'Comic', image: '/comic.png' },
        { name: 'GTA', image: '/gta.png' },
    ];
    const [selectedOption,setSelectedOption] = useState('');

    return (
        <div className={'mt-6'}>
            <h2 className="font-semibold text-xl">Style</h2>
            <p className="text-gray-500 text-sm font-medium">Select the style of the video</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5" >
                {styleOptions.map((item, index) => (
                    <div
                        onClick={()=>{
                            setSelectedOption(item.name)
                            onUserSelect('imageStyle', item.name)
                        }}
                        className={`flex relative hover:scale-105 transition-all cursor-pointer ease-in-out ${selectedOption===item.name&&'border-3 border-rose-700 scale-110 rounded-xl'} `} key={index}>
                        <Image alt={`image-${index}`}  className={'h-48 object-cover rounded-lg w-full'} src={item.image} width={100} height={100} />
                        <span className={'absolute p-1 text-white text-center rounded-b-lg bg-black bottom-0 w-full '}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
