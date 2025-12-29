"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sellerSchema, SellerFormDTO } from "@/schemas/sellerSchema";
import { useSellerStore } from "@/store/sellerStore";
import Spinner from "../shared/Spinner";

interface BecomeASellerProps {
  open: boolean;
  onClose: () => void;
}

const BecomeASeller = ({ open, onClose }: BecomeASellerProps) => {
  const form = useForm<SellerFormDTO>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const { becomeASeller, isLoading, success } = useSellerStore();

  const onSubmit = async (data: SellerFormDTO) => {
    console.log("Seller data:", data);

    await becomeASeller(data);
  };

  if (!open) return null;

  if (success) {
    return <div>{success}</div>;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <Card className="p-6 bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Become a Seller
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* NAME */}
            <div className="space-y-1">
              <Label htmlFor="name">Seller Name</Label>
              <Input
                id="name"
                placeholder="Enter seller name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your store"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting || isLoading ? (
                  <>
                    Submitting <Spinner />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeASeller;
