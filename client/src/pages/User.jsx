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
import Loading from "@/components/Loading1";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { showToast } from "@/halpers/showToast";
import { deleteData } from "@/halpers/handleDelete";
import moment from "moment";
import usericon from '@/assets/images/user.png';

const User = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/user/get-all-user`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/user/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data Deleted.");
    } else {
      showToast("error", "Data not Deleted.");
    }
  };
   console.log(data)
  if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? (
                data.user.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <img
                        src={user.avtar || usericon}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{moment(user?.createdAt).format('DD-MM-YYYY')}</TableCell>

                    <TableCell className="flex gap-3">
                      <Button
                        onClick={() => {
                          handleDelete(user._id);
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

export default User;
