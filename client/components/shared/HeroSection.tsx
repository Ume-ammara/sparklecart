import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>

          <p className="mt-4 text-muted-foreground max-w-md">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality.
          </p>

          <Button className="mt-6">Shop Now</Button>

          <div className="mt-8 flex gap-8">
            <Stat label="Brands" value="200+" />
            <Stat label="Products" value="2,000+" />
            <Stat label="Customers" value="30,000+" />
          </div>
        </div>

        <div className="relative h-[320px] md:h-[420px] rounded-xl bg-muted" />
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
