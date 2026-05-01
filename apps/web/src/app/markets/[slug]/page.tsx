export default async function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Market: {slug}</h1>
    </div>
  );
}
