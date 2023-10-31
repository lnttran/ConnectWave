"use client";
import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SignInButton from "./SignInButton";
import { AnimatePresence, motion } from "framer-motion";
import { ModeToggle } from "./SwitchTheme";
import BalanceView from "./Balance/BalanceView";

export function Appbar() {
  return (
    <NavigationMenu className="bg-slate-500 text-black">
      <NavigationMenuList>Connect Wave</NavigationMenuList>
      <NavigationMenuList className="space-x-10">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/dashboard"}>Dashboard</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/dashboard/checkout"}>Add Funds</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <SignInButton />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <BalanceView />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
