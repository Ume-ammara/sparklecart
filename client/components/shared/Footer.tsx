"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { NewsletterDTO, newsletterSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Features", href: "#" },
  { label: "Works", href: "#" },
  { label: "Career", href: "#" },
];

const helpLinks = [
  { label: "Customer Support", href: "#" },
  { label: "Delivery Details", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const faqLinks = [
  { label: "Account", href: "#" },
  { label: "Manage Deliveries", href: "#" },
  { label: "Orders", href: "#" },
  { label: "Payments", href: "#" },
];

const resourceLinks = [
  { label: "Free eBooks", href: "#" },
  { label: "Development Tutorial", href: "#" },
  { label: "How to - Blog", href: "#" },
  { label: "Youtube Playlist", href: "#" },
];

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterDTO>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterDTO) => {
    console.log("Newsletter Data:", data);
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Newsletter */}
        <div className="mb-16 rounded-2xl bg-card p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold md:text-2xl">
              Stay upto date about <br className="hidden md:block" />
              our latest offers
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative w-full max-w-md"
            >
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="h-11 pl-10 pr-28"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-1 top-1/2 h-9 -translate-y-1/2 cursor-pointer"
              >
                Subscribe
              </Button>

              {errors.email && (
                <p className="mt-2 text-sm text-destructive absolute -bottom-6 left-2">
                  {errors.email.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold">SPARCLE CART</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              We have clothes that suit your style and which you’re proud to
              wear. From women to men.
            </p>
          </div>

          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Help" links={helpLinks} />
          <FooterColumn title="FAQ" links={faqLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <span>Shop.co © 2000–2023, All Rights Reserved</span>

          <div className="flex gap-2">
            <div className="h-6 w-10 rounded bg-muted" />
            <div className="h-6 w-10 rounded bg-muted" />
            <div className="h-6 w-10 rounded bg-muted" />
            <div className="h-6 w-10 rounded bg-muted" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
        {title}
      </h4>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
