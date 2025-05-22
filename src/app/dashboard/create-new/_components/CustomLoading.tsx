"use client"

import React from 'react';
import {
    AlertDialog,
    AlertDialogContent, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import Image from 'next/image';

interface Props {
    loading: boolean;
}

export const CustomLoading = ({loading}: Props) => {
    return (
        <div>
            <AlertDialog open={loading}>
                <AlertDialogContent>
                    <AlertDialogTitle hidden={true}/>
                    <div className='flex flex-col items-center justify-center my-10 bg-white'>
                        <Image alt={'loader'} src={'/progress.gif'} width={100} height={100}/>
                        <h2 className='text-xl'>Generating your video...</h2>
                        <h2 className='text-xl text-yellow-700'>Don&#39;t refresh ⚠️</h2>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}