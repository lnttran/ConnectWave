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
import { ModeToggle } from "./SwitchTheme";
import BalanceView from "./Balance/BalanceView";
import Profile from "../Personal/Profile";
import { signIn, signOut, useSession } from "next-auth/react";

const NavigationLinkButton: (props: {
  href: string;
  title: string;
}) => React.ReactNode = (props) => {
  return (
    <NavigationMenuItem>
      <Link
        href={props.href}
        legacyBehavior
        passHref
        className="font-logo-font text-xl"
      >
        {props.title}
      </Link>
    </NavigationMenuItem>
  );
};
export function Appbar() {
  const { data: session } = useSession();
  const buttonClassName =
    session && session.user ? "text-red-600" : "flex gap-4 ml-auto";

  return (
    <NavigationMenu className="bg-[#f9ead5] dark:bg-[#0a0a2a] dark:text-white text-black">
      <NavigationMenuList className="text-2xl font-logo-font font-extrabold mt-2 ml-1 sm:mt-4 sm:ml-1 ">
        <img src="/ico.png" width="50" className="px-2" />
        Connect Wave
      </NavigationMenuList>
      <NavigationMenuList className="space-x-10">
        <NavigationLinkButton href={"/"} title={"Home"} />
        {session && session.user ? (
          <>
            <NavigationLinkButton href={"/dashboard"} title={"Dashboard"} />
            <NavigationLinkButton
              href={"/dashboard/checkout"}
              title={"Add Funds"}
            />

            <NavigationMenuItem>
              <BalanceView />
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationLinkButton href={"/"} title={"About Us"} />
            <NavigationLinkButton href={"/"} title={"Contact"} />
            <NavigationMenuItem>
              <SignInButton
                onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
                label="Sign In"
              />
            </NavigationMenuItem>
          </>
        )}

        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Profile />
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
