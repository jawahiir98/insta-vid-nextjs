import Image from "next/image";
import {Button} from '@/components/ui/button'
import {UserButton} from "@clerk/nextjs";
import React, {useContext} from "react";
import {Coins} from 'lucide-react'
import {UserDetailContext} from "@/app/_context/UserDetailContext";

export const Header = () => {
    const {userDetail} = useContext(UserDetailContext);

    return (
      <div className={'flex justify-between p-4 shadow-sm'}>
        <div className="flex items-center gap-3">
          <Image alt={'logo'} src={'/logo.svg'} width={30} height={30}/>
          <h2 className="font-bold text-xl bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">
            Insta Vids
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <UserButton/>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <defs>
                    <linearGradient id="iconGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" /> {/* blue-600 */}
                        <stop offset="100%" stopColor="#6B21A8" /> {/* purple-700 */}
                    </linearGradient>
                </defs>
                <Coins size={24} fill="url(#iconGradient)" />
            </svg>
            <span className={'flex items-center gap-2 font-medium  bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent'}>
              {userDetail?.credits} Credits
            </span>
        </div>
      </div>
  )
};
