"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/shared/Footer";
import InfoBar from "@/components/shared/InfoBar";
import Navbar from "@/components/shared/Navbar";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const showNavbar = ["/products", "/dashboard/seller"].includes(pathname);

  const { user, fetchUserProfile } = useAuthStore();

  // Fetch profile
  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  return (
    <>
      <InfoBar />
      {!showNavbar && <Navbar />}
      {children}
      {isHome && <Footer />}
    </>
  );
}
