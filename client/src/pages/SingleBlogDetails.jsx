import { getEnv } from '@/halpers/getenv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from "@/components/Loading";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { decode } from 'entities';
import Comment from '@/components/Comment';
import moment from 'moment';
import CommentCount from '@/components/CommentCount';
import LikeCount from '@/components/LikeCount';
import RelatedBlog from '@/components/RelatedBlog';
// import CommentList from '@/components/CommentList';

const SingleBlogDetails = () => {
    const {blog, category} = useParams()
   //  console.log( category)
    const {data, loading, error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`, {
        method: "get",
        credentials: "include",
        
      },[blog, category]);
     if(loading) return <Loading/>
  return (
    <div className='md:flex-nowrap flex-wrap flex justify-between gap-20'>
        {data && data.blog &&
        <>
        <div className='border rounded md:w-[70%] w-full p-5 '>
           <h1 className='text-2xl font-semibold mb-5'>{data.blog.title}</h1>
        <div className='flex justify-center items-center'>
             <div className='w-full flex gap-5'>
                <Avatar>
                    <AvatarImage src={data.blog.author.avtar} />
                </Avatar>
                <div>
                <p className='font-bold' >{data.blog.author.name}</p>
                <p className='text-gray-500'>Date: {moment(data.blog.createdAt).format('DD-MM-YYYY')}</p>

                </div>

             </div>
             <div className='flex justify-between items-center gap-5'>
                <LikeCount props = {{blogid:data.blog._id}}/>
                <CommentCount props = {{blogid:data.blog._id}}/>

             </div>
        </div>
        <div className='my-5 w-full flex justify-center items-center'>
            <img src={data.blog.featuredImage} alt={data.blog.title} className='rounded-md ' />

        </div>
        <div dangerouslySetInnerHTML={{__html: decode(data.blog.blogContent) || ''}} className='text-gray-600 text-lg leading-7'>

        </div>
        <div className=' border-t mt-5 pt-5'>
           <Comment props={{ blogid: data.blog._id}} />
        </div>
        
        </div>
        </>
        }
        <div className='border rounded md:w-[30%] w-full p-5'>
         <RelatedBlog props = {{category:category, currentBlog: blog}}/>
        </div>
        
    </div>
  )
}

export default SingleBlogDetails
