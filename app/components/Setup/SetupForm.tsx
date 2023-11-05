"use client";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { METHODS } from "http";
import { redirect } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters",
    })
    .max(50, {
      message: "Username must be at most 50 characters",
    })
    .refine((s) => !s.includes(" "), "Username cannot contain spaces"),
  role: z.string().refine(
    (value) => {
      return value === "hunter" || value === "quester";
    },
    {
      message: "Invalid Role",
    }
  ),
});

export default function SetupForm() {
  const { data: session, status } = useSession();

  const [isOnLoad, setIsOnLoad] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    Object.keys(errors).forEach((field) => {
      toast.error((errors as any)[field].message);
    });
  }, [errors]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (session && session.user) {
      setIsOnLoad(true);
      await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, email: session.user.email }),
      })
        .then((response) => {
          setIsOnLoad(false);
          if (!response.ok) {
            toast.error("Something wrong happened");
          }
          return response.json();
        })
        .then((responseData) => {
          setIsOnLoad(false);
          redirect("/dashboard");
        })
        .catch((error) => {
          // console.error('Error:', error);
        });
    }
  }

  return (
    <Card className="w-fit h-fit p-20 shadow-2xl">
      <CardHeader className="p-5">
        <CardTitle>Setup your account</CardTitle>
        <CardDescription>Let's get it started</CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="username"
                  placeholder="Your username"
                  {...register("username")}
                  className="bg-transparent"
                />
              </div>
              <div className="flex flex-col space-y-2.5">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="role">Choose your role</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-transparent">
                            <SelectValue placeholder="Select"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          <SelectItem value="hunter">Hunter</SelectItem>
                          <SelectItem value="quester">Quester</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center pt-5">
              <Button type="submit" disabled={isOnLoad}>
                {isOnLoad && (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </div>
                )}
                {!isOnLoad && <p>Let's Hunting</p>}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
