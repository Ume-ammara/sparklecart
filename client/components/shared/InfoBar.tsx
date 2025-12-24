"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const InfoBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-sm">
        <span>
          Sign up and get 20% off to your first order.&nbsp;
          <Link
            href={"/auth/register"}
            className="underline font-medium"
            onClick={() => setVisible(false)}
          >
            Register Now
          </Link>
        </span>

        <button
          onClick={() => setVisible(false)}
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
