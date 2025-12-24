import ReviewCard from "../product_comps/ReviewCard";

export default function Testimonials() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-2xl font-bold">
          OUR HAPPY CUSTOMERS
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ReviewCard
              key={i}
              name="Aquib Jawed"
              avatarUrl="https://images.unsplash.com/photo-1708559348128-3cde89847e2b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              content="Good Product"
              rating={5}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
