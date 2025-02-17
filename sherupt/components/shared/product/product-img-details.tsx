"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/useIsClient";

const ProductImagesDetails = ({ images }: { images: string[] }) => {
  const [current, setcurrent] = useState(0);


  // Ensure styles are applied only after the component mounts

  const mounted = useIsClient(); // Using the custom hook

  if (!mounted) {
    return null; // Return nothing until the component has mounted
  }

  return (
    <div className="space-y-4">
      <Image
      
        src={images[current]}
        alt="product-image"
        width={1000}
        height={1000}
        className="min-h-[300] object-cover object-center"
        priority
      />
      <div className="flex">
        {images.map((image, index) => (
          <div key={image} onClick={() => setcurrent(index)}
          className={cn(
            "border mr-2 cursor-pointer hover:border-orange-600",
            current === index && "border-orange-500"
          )}
          >
            <Image src={image} alt="image" width={100} height={100} priority />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImagesDetails;
