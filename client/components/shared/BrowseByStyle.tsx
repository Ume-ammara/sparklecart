export default function BrowseByStyle() {
  const styles = ["Casual", "Formal", "Party", "Gym"];

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-2xl font-bold">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {styles.map((style) => (
            <div
              key={style}
              className="flex items-end rounded-xl bg-muted p-4 h-40 font-semibold"
            >
              {style}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
