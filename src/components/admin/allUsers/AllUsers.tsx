"use client";

import React, { useState, useTransition } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
  updateUserStatusAction,
  deleteUserAction,
  updateUserRoleAction,
} from "@/actions/admin.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppImage } from "@/components/appImage/AppImage";
import { useAuth } from "@/context/AuthProvider";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  isDeleted: boolean;
};

const AllUsers = ({ users }: { users: User[] }) => {
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { user } = useAuth();
  const currentUserRole = user?.role;

  const handleDelete = (id: string) => {
    setLoadingId(id);

    startTransition(async () => {
      const res = await deleteUserAction(id);

      if (!res?.ok) {
        toast.error(res?.message || "Failed to delete user");
      } else {
        toast("User deleted successfully");
      }

      setLoadingId(null);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => {
              const isLoading = loadingId === user.id;
              const isDeleted = user.isDeleted;

              return (
                <TableRow
                  key={user.id}
                  className={isDeleted ? "opacity-40 pointer-events-none select-none" : ""}
                >
                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-0">
                      <AppImage
                        src={user.image || "/default-profile.png"}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded object-cover border shrink-0"
                      />
                      <span>{user.name}</span>
                      {isDeleted && (
                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                          Deleted
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="whitespace-nowrap">{user.email}</TableCell>

                  {/* Role */}
                  <TableCell>
                    {isDeleted ? (
                      <span className="text-sm text-muted-foreground">{user.role}</span>
                    ) : (
                      <Select
                        defaultValue={user.role}
                        onValueChange={async (value) => {
                          setLoadingId(user.id);

                          const res = await updateUserRoleAction(
                            user.id,
                            value as "ADMIN" | "USER" | "ORGANIZER"
                          );

                          if (!res?.ok) {
                            toast.error(res?.message || "Failed to update");
                          } else {
                            toast(res?.message || "Status updated");
                          }

                          setLoadingId(null);
                        }}
                      >
                        <SelectTrigger className="w-[130px]" disabled={isLoading}>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {/* SUPERADMIN can assign everything */}
                          {currentUserRole === "SUPERADMIN" && (
                            <>
                              <SelectItem value="ADMIN">ADMIN</SelectItem>
                              <SelectItem value="USER">USER</SelectItem>
                              <SelectItem value="ORGANIZER">ORGANIZER</SelectItem>
                            </>
                          )}

                          {/* ADMIN can assign USER + ORGANIZER */}
                          {currentUserRole === "ADMIN" && (
                            <>
                              <SelectItem value="USER">USER</SelectItem>
                              <SelectItem value="ORGANIZER">ORGANIZER</SelectItem>
                            </>
                          )}

                          {/* fallback (optional safety) */}
                          {!["SUPERADMIN", "ADMIN"].includes(currentUserRole || "") && (
                            <SelectItem value={user.role}>{user.role}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {isDeleted ? (
                      <span className="text-sm text-muted-foreground">{user.status}</span>
                    ) : (
                      <Select
                        defaultValue={user.status}
                        onValueChange={async (value) => {
                          setLoadingId(user.id);
                          const res = await updateUserStatusAction(user.id, { status: value });
                          if (!res?.ok) {
                            toast.error(res?.message || "Failed to update");
                          } else {
                            toast(res?.message || "Status updated");
                          }
                          setLoadingId(null);
                        }}
                      >
                        <SelectTrigger className="w-[130px]" disabled={isLoading}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="SUSPENDED">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>

                  {/* Verified */}
                  <TableCell>
                    <Badge variant={user.emailVerified ? "default" : "destructive"}>
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </TableCell>

                  {/* Created */}
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex items-end justify-end gap-2">
                      {!isDeleted && (
                        <Button
                          variant="destructive"
                          disabled={isLoading}
                          onClick={() => handleDelete(user.id)}
                        >
                          {isLoading ? "..." : <Trash2 />}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AllUsers;