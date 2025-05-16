import Image from "next/image";
import {Button} from '@/components/ui/button'
import {UserButton} from "@clerk/nextjs";
import React from "react";

export const Header = () => {
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
          <Button>Dashboard</Button>
        </div>
      </div>
  )
};
