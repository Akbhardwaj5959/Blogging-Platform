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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/halpers/showToast";
import { getEnv } from "@/halpers/getenv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RouteBlog } from "@/halpers/RouteName";
import { decode} from "entities"
import Loading from "@/components/Loading1";
const EditBlog = () => {
  const {blogid} = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();

  const {
    data: categoryData,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`, {
    method: "get",
    credentials: "include",
  });

  const {data:blogData, loading: blogLoading} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/edit/${blogid}`, {
    method: "get",
    credentials: "include",
  }, [blogid]);

  // console.log("blogData", blogData);

  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long."),
    title: z.string().min(3, "Title must be at least 3 characters long."),
    slug: z.string().min(3, "Slug must be at least 3 characters long."),
    blogContent: z
      .string()
      .min(3, "Blog content must be at least 3 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });


  useEffect(() => {
    if(blogData) {
      form.setValue("category", blogData.blog.category._id); 
      form.setValue("title", blogData.blog.title);
      form.setValue("slug", blogData.blog.slug);
      form.setValue("blogContent", decode(blogData.blog.blogContent));
      setPreview(blogData.blog.featuredImage);
      // setFile(blogData.blog.featuredImage);
      
    }
  }, [blogData]);

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
    // console.log("Editor data:", data);
  };

  const blogTitle = form.watch("title");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  async function onSubmit(values) {
    try {

      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(values));

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/update/${blogid}`,
        {
          method: "put",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      // Reset form and file state 
      form.reset();
      setFile();
      setPreview();


      navigate(RouteBlog);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
      console.error("Error during registration:", error);
    }
  }

  const handelFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  if(blogLoading) return <Loading/>
  return (
    <div>
      <Card className="pt-5">
        <CardContent>
          <h1 className="text-2xl font-semibold mb-4">Edit Blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryData &&
                              categoryData.category.length > 0 &&
                              categoryData.category.map((category) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Blog Title" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <span className="mb-2 block ">Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handelFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />

                      <div className="border-2 border-dashed flex items-center justify-center h-28 w-36 rounded">
                        <img src={filePreview} />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      {/* {console.log(field.value)} */}
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl>
                        <Editor
                          key={field.value} // ya key={blogData?.blog?.blogContent}
                          props={{
                            initialData: field?.value,
                            onChange: handleEditorData,
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlog;
