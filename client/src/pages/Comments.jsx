import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/halpers/RouteName";
import React, { useState } from "react";
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
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/halpers/getenv";
import Loading from "@/components/Loading";

import { FaRegTrashAlt } from "react-icons/fa";
import { showToast } from "@/halpers/showToast";
import { deleteData } from "@/halpers/handleDelete";
import moment from "moment";

const Comments = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/comment/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data Deleted.");
    } else {
      showToast("error", "Data not Deleted.");
    }
  };
  //  console.log(data)
  if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Commented By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments.length > 0 ? (
                data.comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell>{comment?.blogid?.title}</TableCell>
                    <TableCell>{comment?.user?.name}</TableCell>
                    <TableCell>{moment(comment?.createdAt).format('DD-MM-YYYY')}</TableCell>

                    <TableCell>{comment?.comment}</TableCell>

                    <TableCell className="flex gap-3">
                      <Button
                        onClick={() => {
                          handleDelete(comment._id);
                        }}
                        variant="outline"
                        className="hover:bg-red-500"
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data not found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comments;
