import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/halpers/RouteName'


const BlogCard = ({props}) => {
    if (!props.author) {
  return null; // Ya ek fallback UI
}
  return (
    <Link to = {RouteBlogDetails(props.category.slug, props.slug)} className='no-underline text-black'>
    <Card className='pt-5'>
      <CardContent> 
         <div className='flex items-center gap-3 mb-3'>
            <div className='flex  justify-between items-center gap-2 w-full'>
                <Avatar>
                    <AvatarImage src={props.author.avtar || usericon } className='rounded-full ' />
                </Avatar>
                <span className='font-semibold gap-5'>{props?.author?.name}</span>
            </div>
            <div className='flex items-center'>
            { props.author.role === 'admin' &&
                <Badge variant="outline" className='bg-orange-500 w-20  ml-2 px-2 py-1 rounded-md text-xs font-bold'>Admin</Badge>
            }
            </div>
         </div>

         <div className=' my-2'>
           <img src={props.featuredImage} alt={props.title} className='rounded-md' />
         </div>

         <div>
            <p className='flex items-center gap-2 text-sm text-gray-500'>
             <FaRegCalendarAlt />
             <span>{moment(props.createdAt).format('MMMM Do YYYY')}</span>
            </p>
            <h2 className='text-2xl font-bold line-clamp-2'>{props.title}</h2>
         </div>

      </CardContent>
    </Card>
    </Link>
  )
}

export default BlogCard
