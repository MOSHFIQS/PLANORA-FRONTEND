"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { createReview} from "@/actions/review.action";

type Props = {
  eventId: string;
  children: React.ReactNode; // trigger button
};

const ReviewDialog = ({ eventId, children }: Props) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!rating) {
      toast.error("Rating is required");
      return;
    }

    startTransition(async () => {
      const res = await createReview({
        eventId,
        rating,
        comment,
      });

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success("Review submitted");
      setOpen(false);
      setComment("");
      setRating(5);
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Write a Review</AlertDialogTitle>
          <AlertDialogDescription>
            Share your experience about this event
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Rating */}
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={rating >= star ? "default" : "outline"}
              size="sm"
              onClick={() => setRating(star)}
            >
              {star}
            </Button>
          ))}
        </div>

        {/* Comment */}
        <Textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-3"
        />

        <AlertDialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReviewDialog;