"use client";
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"


const SignInButton = ({ onClick, label, className }: { onClick: () => void, label: string, className: string }) => {
    return (
        <Button onClick={onClick} className={className}>
            {label}
        </Button>
    );
};

export default SignInButton;