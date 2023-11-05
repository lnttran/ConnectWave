"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import SignInButton from "../Appbar/SignInButton";

const Profile = () => {
    const { data: session } = useSession();
    if (session?.user) {
        const userName = session.user.name ?? "";
        const imgURL = session?.user ? "https://github.com/shadcn.png" : null;
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <div className='flex items-center gap-4'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
                            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className='flex items-center gap-4'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
                                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <SheetTitle>{userName}</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                    </div>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                    <SheetFooter>
                        <SignInButton onClick={() => signOut()} label="Sign Out" className="flex gap-4 ml-auto" />
                    </SheetFooter>
                </SheetContent>
            </Sheet>)
    }
    return null;



}

export default Profile;