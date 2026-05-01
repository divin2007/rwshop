export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Product: {id}</h1>
    </div>
  );
}
