"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { updateReview } from "@/actions/review.action";

type Review = {
  id: string;
  rating: number;
  comment?: string;
};

type Props = {
  review: Review;
  onUpdated?: (updated: Review) => void;
};

const UpdateReviewDialog = ({ review, onUpdated }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      rating: review?.rating || 0,
      comment: review?.comment || "",
    },

    onSubmit: async ({ value }) => {
      try {
        setLoading(true);

        const res = await updateReview(review.id, {
          rating: Number(value.rating),
          comment: value.comment,
        });

        if (!res?.ok) throw new Error(res.message);

        // update UI instantly
        onUpdated?.({
          ...review,
          rating: value.rating,
          comment: value.comment,
        });

        toast("Review updated successfully");
        setOpen(false);
      } catch (err: any) {
        toast.error(err?.message || "Update failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="violet">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Review</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* RATING */}
          <form.Field name="rating">
            {(field) => (
              <div className="space-y-2">
                <Label>Rating</Label>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const value = i + 1;

                    return (
                      <Star
                        key={i}
                        size={40}
                        className={`cursor-pointer ${
                          value <= field.state.value
                            ? "text-[#725cAD] fill-[#725cAD]"
                            : "text-gray-300"
                        }`}
                        onClick={() =>
                          field.handleChange(value)
                        }
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </form.Field>

          {/* COMMENT */}
          <form.Field name="comment">
            {(field) => (
              <div className="space-y-2">
                <Label>Comment</Label>

                <textarea
                  className="w-full border rounded-md p-2 text-sm"
                  placeholder="Write your feedback..."
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                />
              </div>
            )}
          </form.Field>

          {/* FOOTER */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateReviewDialog;