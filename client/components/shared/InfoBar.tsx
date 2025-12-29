"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const STORAGE_KEY = "infobar";

const getInitialVisibility = (): boolean => {
  if (typeof window === "undefined") return false;

  const storedValue = localStorage.getItem(STORAGE_KEY);

  if (storedValue === null) {
    localStorage.setItem(STORAGE_KEY, "true");
    return true;
  }

  return storedValue === "true";
};

const InfoBar = () => {
  const [visible, setVisible] = useState<boolean>(getInitialVisibility);

  const closeInfoBar = () => {
    localStorage.setItem(STORAGE_KEY, "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-sm">
        <span>
          Sign up and get 20% off to your first order.&nbsp;
          <Link
            href="/auth/register"
            className="font-medium underline"
            onClick={closeInfoBar}
          >
            Register Now
          </Link>
        </span>

        <button
          onClick={closeInfoBar}
          className="absolute right-4 text-primary-foreground/80 hover:text-primary-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default InfoBar;
