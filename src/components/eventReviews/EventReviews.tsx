"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Trash2 } from "lucide-react";
import { deleteReview } from "@/actions/review.action";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppImage } from "../appImage/AppImage";

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type Review = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user: User;
};

type EventReviewsProps = {
  organizersReviews: Review[];
};

const EventReviews: React.FC<EventReviewsProps> = ({ organizersReviews }) => {
  const [reviews, setReviews] = useState(organizersReviews);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false); // track deletion

  const handleDelete = async () => {
    if (!selectedReviewId) return;

    setDeleting(true);
    try {
      const res = await deleteReview(selectedReviewId);
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== selectedReviewId));
        toast.success("Review deleted successfully!");
      } else {
        toast.error(res.message || "Failed to delete review");
      }
    } finally {
      setDeleting(false);
      setDialogOpen(false);
      setSelectedReviewId(null);
    }
  };

  if (!reviews || reviews.length === 0) {
    return <p className="p-6 text-gray-500 text-center">No reviews yet.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {reviews.map((review) => (
        <Card key={review.id} className="hover:shadow transition-shadow duration-300 relative">
          <CardHeader className="flex items-center  gap-2 ">
            <div className="border rounded-full">
              <AppImage src={review.user.image} alt={review.user.name} className="w-10 h-10 rounded-full"/>
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">{review.user.name}</CardTitle>
              <p className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Delete Button triggers dialog */}
            <Dialog open={dialogOpen && selectedReviewId === review.id} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={() => setSelectedReviewId(review.id)}
                  className="ml-auto text-red-500 hover:text-red-700 transition"
                  aria-label="Delete review"
                >
                  <Trash2 size={18} />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Review?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this review? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={deleting}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent>
            <div className="flex mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            {review.comment && <p className="text-gray-700">{review.comment}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventReviews;