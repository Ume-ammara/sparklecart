"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon, Trash } from "lucide-react";
import Spinner from "./Spinner";

type ActionButtonProps = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: LucideIcon;
  action?: () => void;
  isLoading?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ActionButton = ({
  title = "Confirm This Action",
  description = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  icon: Icon = Trash,
  action = () => {
    console.log("Action confirmed");
  },
  isLoading = false,
  open = false,
  onOpenChange = () => {},
}: ActionButtonProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        // removes the top-right ❌ close button
        className="[&>button]:hidden"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            {cancelLabel}
          </Button>

          <Button
            disabled={isLoading}
            onClick={action}
            className="cursor-pointer flex items-center gap-2 px-10"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <Icon className="h-4 w-4" />
                {confirmLabel}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionButton;
