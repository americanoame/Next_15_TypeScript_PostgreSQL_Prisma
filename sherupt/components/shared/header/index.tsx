"use client";

import { useIsClient } from "@/hooks/useIsClient";


import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import Menu from "./menu";

const Header = () => {

  // Using the custom hook to check if the component is mounted on the client side
  const mounted = useIsClient();

  // Return null (render nothing) until the component has mounted on the client
  if (!mounted) {
    return null;
  }


  return (
    <header className="w-full  ">
      <div className="wrapper flex-between">
        <div className="flex-start">
          
          <Link href="/" className="flex-start ml-4">
            <Image
              src="/images/logo.png"
              alt={` ${APP_NAME}  logo`}
              height={48}
              width={48}
              priority={true}
              className="rounded-full"
            />

            <span className="span hidden lg:block font-size text2xl ml-3">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="ml-28 hidden md:block">
          
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
