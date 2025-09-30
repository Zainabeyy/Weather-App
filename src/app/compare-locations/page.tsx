import ComparisonComp from "@/components/comparison/ComparisonComp";

export default async function CompareLocations({
  searchParams,
}: {
  searchParams: Promise<{
    City1: string;
    City2:string;
  }>;
}) {
  const params = (await searchParams);

  return (
    <div>
      <h1 className="text-preset-2xl text-center mt-16">Compare Cities</h1>
      <p className="text-preset-lg text-center">
        Compare weather between two Cities
      </p>

      <ComparisonComp city1={params.City1} city2={params.City2}/>
    </div>
  );
}
