"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import ImageUploader from "../imageUploader/ImageUploader";
import { useImageUpload } from "@/hooks/useImageUpload";
import { AppImage } from "../appImage/AppImage";
import { Calendar, Clock, Mail, Pencil, ShieldCheck, UserRound } from "lucide-react";

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
     const [open, setOpen] = useState(false);

     const handleUpdate = async () => {
          setIsUpdating(true);
          try {
               const image = profileImage.images[0]?.img;
               const updateRes = await updateProfileAction({ name: newName, image });
               if (!updateRes.ok) {
                    toast.error("Update failed");
                    return;
               }
               setProfile(updateRes.data);
               toast.success("Profile updated successfully");
               setOpen(false);
          } catch {
               toast.error("Something went wrong");
          } finally {
               setIsUpdating(false);
          }
     };

     const infoFields = [
          {
               icon: Mail,
               label: "Email Address",
               value: profile.email,
               extra: (
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full ${profile.emailVerified ? "bg-teal-500/10 text-teal-600 border border-teal-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                         <ShieldCheck className="w-3 h-3" />
                         {profile.emailVerified ? "Verified" : "Unverified"}
                    </span>
               ),
          },
          {
               icon: UserRound,
               label: "Role",
               value: profile.role,
               extra: null,
          },
          {
               icon: Calendar,
               label: "Member Since",
               value: new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
               }),
               extra: null,
          },
          {
               icon: Clock,
               label: "Last Updated",
               value: new Date(profile.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
               }),
               extra: null,
          },
     ];

     return (
          <div className="w-full max-w-3xl mx-auto space-y-4">

               {/* Hero card */}
               <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">

                    {/* Top banner strip */}
                    <div className="h-24 bg-gradient-to-r from-gray-400/20 via-gray-400/10 to-transparent dark:from-teal-500/10" />

                    {/* Avatar + name row */}
                    <div className="px-8 pb-8 -mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                         <div className="flex items-end gap-4">
                              {/* Avatar */}
                              <div className="relative shrink-0">
                                   <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-950 shadow-lg">
                                        <AppImage
                                             src={profile.image || "/default-profile.png"}
                                             alt={profile.name}
                                             className="w-full h-full object-cover"
                                        />
                                   </div>
                                   {/* Status dot */}
                                   <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-950 ${profile.status === "ACTIVE" ? "bg-teal-500" : "bg-gray-400"}`} />
                              </div>

                              {/* Name + badges */}
                              <div className="pb-1">
                                   <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                                        {profile.name}
                                   </h2>
                                   <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                        <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                                             <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                                             {profile.status}
                                        </span>
                                        <span className="inline-flex items-center text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                                             {profile.role}
                                        </span>
                                   </div>
                              </div>
                         </div>

                         {/* Edit button */}
                         <Dialog open={open} onOpenChange={setOpen}>
                              <DialogTrigger asChild>
                                   <button className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-teal-500/50 hover:bg-teal-50/50 dark:hover:bg-teal-500/5 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-all duration-200 self-start sm:self-auto shrink-0">
                                        <Pencil className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-500 transition-colors" />
                                        Edit Profile
                                   </button>
                              </DialogTrigger>

                              <DialogContent className="sm:max-w-md rounded-2xl">
                                   <DialogHeader>
                                        <DialogTitle className="text-lg font-black">Edit Profile</DialogTitle>
                                        <DialogDescription className="text-sm text-gray-400">
                                             Update your display name and profile image.
                                        </DialogDescription>
                                   </DialogHeader>

                                   <div className="flex flex-col gap-5 mt-2">
                                        <div className="space-y-1.5">
                                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                  Display Name
                                             </label>
                                             <Input
                                                  value={newName}
                                                  onChange={(e) => setNewName(e.target.value)}
                                                  placeholder="Your name"
                                                  className="rounded-xl"
                                             />
                                        </div>

                                        <div className="space-y-1.5">
                                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                  Profile Image
                                             </label>
                                             <ImageUploader
                                                  label="Profile Image"
                                                  images={profileImage.images}
                                                  onUpload={profileImage.upload}
                                                  onDelete={profileImage.remove}
                                                  multiple={false}
                                             />
                                        </div>
                                   </div>

                                   <DialogFooter className="mt-4 gap-2">
                                        <Button
                                             variant="outline"
                                             className="rounded-xl"
                                             onClick={() => setOpen(false)}
                                        >
                                             Cancel
                                        </Button>
                                        <Button
                                             onClick={handleUpdate}
                                             disabled={isUpdating}
                                             className="rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold px-6"
                                        >
                                             {isUpdating ? "Saving..." : "Save Changes"}
                                        </Button>
                                   </DialogFooter>
                              </DialogContent>
                         </Dialog>
                    </div>
               </div>

               {/* Info grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {infoFields.map(({ icon: Icon, label, value, extra }) => (
                         <div
                              key={label}
                              className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-teal-500/30 transition-colors duration-200"
                         >
                              <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center shrink-0 group-hover:border-teal-500/30 group-hover:bg-teal-50/50 dark:group-hover:bg-teal-500/5 transition-colors duration-200">
                                   <Icon className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transition-colors duration-200" />
                              </div>
                              <div className="min-w-0 flex-1">
                                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                        {label}
                                   </p>
                                   <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                                        {value}
                                   </p>
                                   {extra && <div className="mt-1.5">{extra}</div>}
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default MyProfile;