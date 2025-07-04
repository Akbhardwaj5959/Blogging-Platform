import { getEnv } from '@/halpers/getenv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import Loading from '../components/Loading'
import BlogCard from '@/components/BlogCard';

const index = () => {
   const {data: blogData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/blogs`,{
            method: 'get',
            credentials: 'include'
        })
        if(loading) return <Loading/> 
  return (
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
  )
}

export default index
