import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProductSection({ title }: { title: string }) {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-2xl font-bold">{title}</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-3">
              <Image
                width={300}
                height={100}
                src={
                  "https://images.unsplash.com/photo-1693443687750-611ad77f3aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                className="h-40 rounded-lg bg-muted mb-3"
                alt="Product Image"
              />
              <p className="font-medium">Product Name</p>
              <p className="text-sm text-muted-foreground">$120</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline">View All</Button>
        </div>
      </div>
    </section>
  );
}
