"use client";
import { useIsClient } from "@/hooks/useIsClient";

import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  // Using the custom hook to check if the component is mounted on the client side
  const mounted = useIsClient();

  // Return null (render nothing) until the component has mounted on the client
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <Image
        src="/images/logo.png"
        alt={` ${APP_NAME}  logo`}
        height={48}
        width={48}
        priority={true}
        className="rounded-full"
      />
      <h1 className="text-3xl font-bold mt-4">Page Not Found</h1>
      <p className="mt-2 text-lg">Could not find the requested page.</p>

      <Link href="/">
        <Button className="mt-4 px-6 py-2 bg-primary rounded hover:bg-primary-dark">
          Take me back to home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
