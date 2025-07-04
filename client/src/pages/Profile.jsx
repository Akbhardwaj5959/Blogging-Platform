import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEnv } from "@/halpers/getenv";
import { showToast } from "@/halpers/showToast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading1";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { setUser } from "@/redux/user/user.slice";

const Profile = () => {

  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();

  

  const user = useSelector((state) => state.user);

  const {
    data: userData,
    loading,  
    error,
  } = useFetch( `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`,
    { method: "get", credentials: "include" }
  );
  

  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long ."),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be at least 3 characters long."),

  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: ""
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
        {
          method: "Put",
          credentials: "include",
          body: formData
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }

      dispatch(setUser(data.user));

      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
      console.error("Error during registration:", error);
    }
  }


  const handelFileSelection = (files)=>{
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }

  if (loading) return <Loading />;
  return (

      <Card className="max-w-md mx-auto mt-10 ">
        <CardContent>
          <div className="flex items-center justify-center ">
            <Dropzone onDrop={acceptedFiles => handelFileSelection(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (

                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  <Avatar className="w-24 h-24 relative group">
                    <AvatarImage src={ filePreview? filePreview : userData?.user?.avtar} />
                    <div
                      className="absolute z-10 w-full h-full flex
                        items-center justify-center bg-black/50 text-white rounded-full
                        opacity-0 group-hover:opacity-100 transition-opacity
                        duration-300 cursor-pointer">

                      <IoCameraOutline />
                    </div>
                  </Avatar>
                </div>
              )}
            </Dropzone>

          </div>
          <div>
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
                          <Input placeholder="Enter your Email" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your Bio" {...field} />
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
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            </Form>
          </div>
        </CardContent> 
      </Card>

  );
};

export default Profile;




