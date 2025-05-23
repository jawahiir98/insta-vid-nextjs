import Image from "next/image";
import {Button} from '@/components/ui/button'
import {UserButton} from "@clerk/nextjs";
import React,{useContext} from "react";
import {Coins} from 'lucide-react'
import {UserDetailContext} from "@/app/_context/userDetailContext";

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
              <div className='flex items-center justify-center gap-1'>
                  <Coins size={15} className='text-yellow-600'/>
                  <h2 className={`font-semibold ${userDetail?.credits >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>{userDetail?.credits}</h2>
              </div>
              <UserButton/>
              <Button>Dashboard</Button>
          </div>
      </div>
  )
};
