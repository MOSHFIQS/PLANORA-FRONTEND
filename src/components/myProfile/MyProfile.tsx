"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
     Dialog,
     DialogTrigger,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogDescription,
     DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateProfileAction } from "@/actions/profile.action";
import { uploadImagesAction } from "@/actions/file.action"; // your upload action
import { toast } from "sonner";
import ImageUploader from "../imageUploader/ImageUploader";
import { useImageUpload } from "@/hooks/useImageUpload";
import { AppImage } from "../appImage/AppImage";

type MyProfileProps = {
     profileData: {
          id: string;
          name: string;
          email: string;
          role: string;
          status: string;
          emailVerified: boolean;
          image?: string;
          createdAt: string;
          updatedAt: string;
     };
};

const MyProfile: React.FC<MyProfileProps> = ({ profileData }) => {
     const [profile, setProfile] = useState(profileData);
     const [isUpdating, setIsUpdating] = useState(false);
     const [newName, setNewName] = useState(profileData.name);
     const profileImage = useImageUpload({ max: 1 });
     console.log(profileImage.images[0]?.img);
     const [open, setOpen] = useState(false);

     const handleUpdate = async () => {
          setIsUpdating(true);
          try {
               let image = profileImage.images[0]?.img

             

               // 2️⃣ Update profile
               const updateRes = await updateProfileAction({ name: newName, image });

               if (!updateRes.ok) {
                    toast.error("Upload failed");
                    setIsUpdating(false);
                    return;
               }

               // 3️⃣ Update local state
               setProfile(updateRes.data);
               toast.success("Successfully updated profile");
               setOpen(false);
          } catch (err) {
               toast("Something went wrong");
          } finally {
               setIsUpdating(false);
          }
     };

     return (
          <div className="w-full md:max-w-3xl mx-auto">
               <Card className="shadow border border-gray-200">
                    {/* Header */}
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                         <div className="flex items-center gap-4">
                              <AppImage
                                   src={profile.image || "/default-profile.png"}
                                   alt={profile.name}
                                   className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
                              />
                              <div>
                                   <CardTitle className="text-3xl font-bold">{profile.name}</CardTitle>
                                   <div className="flex items-center gap-2 mt-1">
                                        <Badge variant={profile.status === "ACTIVE" ? "default" : "outline"} className="bg-green-500 text-white">
                                             {profile.status}
                                        </Badge>
                                        <Badge variant={profile.emailVerified ? "default" : "destructive"}>
                                             {profile.emailVerified ? "Email Verified" : "Unverified"}
                                        </Badge>
                                   </div>
                              </div>
                         </div>

                         {/* Edit Profile Dialog */}
                         <Dialog open={open} onOpenChange={setOpen}>
                              <DialogTrigger asChild>
                                   <Button variant="outline">Edit Profile</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-lg">
                                   <DialogHeader>
                                        <DialogTitle>Edit Profile</DialogTitle>
                                        <DialogDescription>Update your name and profile image</DialogDescription>
                                   </DialogHeader>

                                   <div className="flex flex-col gap-4 mt-4">
                                        <div>
                                             <label className="block text-sm font-medium mb-1">Name</label>
                                             <Input
                                                  value={newName}
                                                  onChange={(e) => setNewName(e.target.value)}
                                                  placeholder="Your name"
                                             />
                                        </div>

                                        <div>
                                             <label className="block text-sm font-medium mb-1">Profile Image</label>
                                             <ImageUploader
                                                  label="Profile Image"
                                                  images={profileImage.images}
                                                  onUpload={profileImage.upload}
                                                  onDelete={profileImage.remove}
                                                  multiple={false}
                                             />
                                        </div>
                                   </div>

                                   <DialogFooter className="mt-4">
                                        <Button
                                             onClick={handleUpdate}
                                             disabled={isUpdating}
                                             className="w-full"
                                        >
                                             {isUpdating ? "Updating..." : "Save Changes"}
                                        </Button>
                                   </DialogFooter>
                              </DialogContent>
                         </Dialog>
                    </CardHeader>

                    <Separator className="my-4" />

                    {/* Content */}
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <div className="flex items-center gap-2">
                                   <span className="text-lg font-semibold">{profile.email}</span>
                                   <Badge variant={profile.emailVerified ? "default" : "destructive"}>
                                        {profile.emailVerified ? "Verified" : "Unverified"}
                                   </Badge>
                              </div>
                         </div>

                         <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Role</p>
                              <Badge className="uppercase">{profile.role}</Badge>
                         </div>

                         <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Joined At</p>
                              <span className="text-lg">{new Date(profile.createdAt).toLocaleDateString()}</span>
                         </div>

                         <div className="space-y-1">
                              <p className="text-sm font-medium text-gray-500">Last Updated</p>
                              <span className="text-lg">{new Date(profile.updatedAt).toLocaleDateString()}</span>
                         </div>
                    </CardContent>
               </Card>
          </div>
     );
};

export default MyProfile;