export default function BrandStrip() {
  return (
    <section className="border-y border-border py-6">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-8 text-sm font-semibold">
        {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map((brand) => (
          <span key={brand}>{brand}</span>
        ))}
      </div>
    </section>
  );
}
