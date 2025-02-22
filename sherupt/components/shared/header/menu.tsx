import { EllipsisVertical, ShoppingCart } from "lucide-react";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ModeToggle from "./mode-toggle";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-end items-center w-full p-4">
      <nav className="hidden md:flex items-center gap-3">
        <ModeToggle />

        <Link href="/cart">
          <ShoppingCart />
        </Link>

        <UserButton />
      </nav>

      {/* Mobile Navigation  */}
      <nav className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger className="ml-2">
            <EllipsisVertical size={28} />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <ModeToggle />
            <SheetTitle>Menu</SheetTitle>

            <Link href="/">Home</Link>

            <Link href="/cart">
              <ShoppingCart /> Cart
            </Link>

            <UserButton />

            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
