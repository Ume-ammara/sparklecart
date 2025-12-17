export default function Testimonials() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-2xl font-bold">
          OUR HAPPY CUSTOMERS
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-4">
              <p className="font-medium">Customer Name</p>
              <p className="text-sm text-muted-foreground mt-2">
                “Great quality and fast delivery. Will shop again!”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
