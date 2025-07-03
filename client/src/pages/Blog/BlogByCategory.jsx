import React from 'react'
import { useParams } from 'react-router-dom';
import Loading from "@/components/loading";
import { useFetch } from '@/hooks/useFetch';
import { getEnv } from '@/halpers/getenv';
import BlogCard from '@/components/BlogCard';
import { BiCategory } from "react-icons/bi";


const BlogByCategory = () => {
    const {category} = useParams();
    const {data: blogData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog-by-category/${category}`,{
            method: 'get',
            credentials: 'include'
        }, [category]);
        // console.log(blogData)
        if(loading) return <Loading/> 
  return (
    <>
    <div className='flex  items-center gap-2 mb-5 text-2xl font-bold text-violet-500 border-b pb-3 mb-5'>
        <BiCategory/>
        <h4 >
        {blogData && blogData.categoryData?.name}

        </h4>
        
    </div>
    <div className=' grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      {blogData && blogData.blog.length>0
      ?
      blogData.blog.map(blog => <BlogCard key={blog._id} props = {blog} />)
      :
      <div>
        Data Not Found.
      </div>
      }
    </div>
    </>
  )
}

export default BlogByCategory
