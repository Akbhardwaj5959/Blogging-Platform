
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteBlogAdd, RouteBlogEdit } from "@/halpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/halpers/getenv";
import { deleteData } from "@/halpers/handleDelete";
import { useState } from "react";
import { showToast } from "@/halpers/showToast";
import Loading from "@/components/loading";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from "moment";

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false)

      const {data: blogData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`,{
          method: 'get',
          credentials: 'include'
      }, [refreshData])
  
      const handleDelete = (id)=>{
          const response = deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`)
          if(response){
              setRefreshData(!refreshData)
              showToast('success', 'Data Deleted.')
          }else{
               showToast('error', 'Data not Deleted.')
  
          }
      }
      // console.log(blogData); 
  
      if(loading) return <Loading/>
  return (
     <div>
      <Card className='max-w-7xl mx-auto mt-10'>
        <CardHeader>
          <div> 
            <Button asChild>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
             
            <TableHeader >
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
                 
              </TableRow>
            </TableHeader> 
            <TableBody > 
              {blogData && blogData.blog.length > 0 ? 
              blogData.blog.map(blog =>
                <TableRow key={blog._id}>
                <TableCell>{blog?.author?.name}</TableCell>
                <TableCell>{blog?.category?.name}</TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.slug}</TableCell>
                {/* <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell> */}
                <TableCell>{moment(blog.createdAt).format("DD-MM-YYYY")}</TableCell>


                <TableCell className="flex gap-3">
                    <Button variant='outline' className="hover:bg-green-500" asChild>
                        <Link to={RouteBlogEdit(blog._id)}>
                         <FaRegEdit/>
                        </Link> 
                    </Button>
                    <Button onClick = {()=>{handleDelete(blog._id)}} variant='outline' className="hover:bg-red-500" >
                        
                         <FaRegTrashAlt/>
                        
                    </Button>
                </TableCell>
              </TableRow>
              )
              :
              <TableRow>
                <TableCell colSpan = '3'>Data not found</TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogDetails
