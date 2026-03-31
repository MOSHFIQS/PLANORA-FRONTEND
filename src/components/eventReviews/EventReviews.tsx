"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import UpdateReviewDialog from "../updatedReviewDialog/UpdatedReviewDialog";
import { usePathname } from "next/navigation";

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
  const [deleting, setDeleting] = useState(false);
  const pathname = usePathname()

  const handleDelete = async () => {
    if (!selectedReviewId) return;

    setDeleting(true);
    try {
      const res = await deleteReview(selectedReviewId);

      if (res.ok) {
        setReviews((prev) =>
          prev.filter((r) => r.id !== selectedReviewId)
        );
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

  if (!reviews?.length) {
    return (
      <p className="p-6 text-gray-500 text-center">
        No reviews yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {reviews.map((review) => (
        <Card
          key={review.id}
          className="p-4 rounded-2xl border-2 border-gray-300 flex flex-col gap-3 transition hover:shadow-md hover:border-purple-400"
        >
          {/* Header */}
          <CardHeader className="p-0 flex items-center gap-3">
            {/* Avatar */}
            <AppImage
              src={review.user?.image}
              alt={review.user?.name}
              className="w-10 h-10 rounded-full object-cover border-2  "
            />

            {/* User Info */}
            <div>
              <CardTitle className="text-sm font-semibold">
                {review.user?.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-2">
              {/* UPDATE */}
              {pathname === "/dashboard/review" && (
                <UpdateReviewDialog
                  review={review}
                  onUpdated={(updatedReview) => {
                    setReviews((prev) =>
                      prev.map((r) =>
                        r.id === updatedReview.id
                          ? { ...r, ...updatedReview }
                          : r
                      )
                    );
                  }}
                />
              )}

              {/* DELETE */}
              <Dialog
                open={dialogOpen && selectedReviewId === review.id}
                onOpenChange={setDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                  variant={"outline"}
                    onClick={() => setSelectedReviewId(review.id)}
                    className="p-0 rounded hover:bg-red-100 transition"
                    aria-label="Delete review"
                  >
                    <Trash2 size={19} className="text-red-500" />
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Review?</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this review? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                      disabled={deleting}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="p-0 space-y-2">
            {/* Rating */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            {/* Comment */}
            {review.comment && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventReviews;