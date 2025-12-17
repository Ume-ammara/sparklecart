import { Button } from "@/components/ui/button";

export default function ProductSection({ title }: { title: string }) {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-2xl font-bold">{title}</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-3">
              <div className="h-40 rounded-lg bg-muted mb-3" />
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
