"use client";
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"


const SignInButton = ({ onClick, label }: { onClick: () => void, label: string }) => {
    return (
        <Button onClick={onClick} className='bg-transparent border border-sky-50 ease-in-out text-white hover:bg-white hover:text-black'>
            {label}
        </Button>
    );
};

export default SignInButton;