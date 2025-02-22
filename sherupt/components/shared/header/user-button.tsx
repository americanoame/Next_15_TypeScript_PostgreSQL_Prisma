"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { SignOutUser } from "@/lib/actions/user.actions";

const UserButton = () => {

  interface Session {
    user: {
      name: string;
      email: string;
    };
  }

  const [session, setSession] = useState<Session | null>(null); 

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const sessionData = await response.json();
          setSession(sessionData);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  // chanining operator ? if user is not there it will be undfined rather than throw an error
  // const firstInitial = session?.user?.name?.slice(0, 1).toUpperCase() ?? "";
  const firstInitial = session?.user?.name?.charAt(0).toUpperCase() ?? "";

  if (!session) {
    // If no user is signed in, show the user icon with a sign-in link
    return (
      <Link href="/api/auth/signin" className="flex items-center gap-2">
        <User size={18} />
      </Link>
    );
  }

  // If the user is signed in, show the first initial in a circle with a Sign Out button
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-300"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem className="p-0 mb-1">
            <form action={SignOutUser} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant="ghost"
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;

{
  /* <div className="flex items-center text-center gap-2">
      <Button
          variant='ghost'
          className='relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-300'
        >
          {firstInitial}
        </Button>
      <form action={SignOutUser} className='w-full ml-4'>
      {session.user?.email}
          <Button
            className='w-full py-4 px-2 h-4'
            
          >
            Sign Out
          </Button>
         
        </form>
    </div> */
}
