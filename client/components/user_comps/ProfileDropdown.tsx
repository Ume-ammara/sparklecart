"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Book, Heart, LogOut, LogOutIcon, Package, User } from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import ActionButton from "../shared/ActionButton";

const ProfileDropdown = () => {
  const router = useRouter();

  const { user, isLoading, logoutUser, isAuthenticated } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/auth/login");
    setOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={user?.avatarUrl || "/default-avatar.png"}
              alt="User avatar"
            />
            <AvatarFallback className="bg-muted text-foreground">
              {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44 bg-background text-foreground"
        >
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/wishlist")}
          >
            <Heart className="mr-2 h-4 w-4" />
            Wishlist
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/order")}
          >
            <Package className="mr-2 h-4 w-4" />
            My Orders
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/seller")}
          >
            <Book className="mr-2 h-4 w-4" />
            Seller Dashboard
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ActionButton
        open={open}
        onOpenChange={setOpen}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        action={handleLogout}
        isLoading={isLoading}
        icon={LogOutIcon}
      />
    </>
  );
};

export default ProfileDropdown;
