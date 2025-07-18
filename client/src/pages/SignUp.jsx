import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { RouteSignIn } from "@/halpers/RouteName";
import { getEnv } from "@/halpers/getenv";
import { showToast } from "@/halpers/showToast";
import GoogleLogin from "@/components/GoogleLogin";

const SignUp = () => {

    const navigate = useNavigate();

  const formSchema = z.object({
      name: z.string().min(3, "Name must be at least 3 characters long."),
      email: z.string().email(),
      password: z.string().min(6, "Password must be at least 6 characters long."),
      confirmPassword: z.string().refine(data => data.password === data.confirmPassword, 'Passwords must match.'),
    });
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

      
    async function onSubmit(values) {
      try {
        const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`
          , {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
          })
          const data = await response.json();
        if (!response.ok) {
          return showToast("error", data.message);
           
        }
        navigate(RouteSignIn);
        showToast("success", data.message);
      } catch (error) {
        showToast("error", error.message);
        console.error("Error during registration:", error);
      }
    }
  
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-96 p-6">
        <h1 className="text-2x1 font-bold text-center mb-5">
          Create New Account
        </h1>
        <div className="">
          <GoogleLogin />
          <div className="border my-5 flex items-center justify-center">
            <span className="absolute bg-white text-sm ">Or</span>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm Password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5">
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div className="text-center mt-5 text-sm justify-center flex gap-2">
                <p>Already have account ?</p>
                <Link className="text-blue-500 hover:underline" to={RouteSignIn}>Sign In</Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default SignUp
