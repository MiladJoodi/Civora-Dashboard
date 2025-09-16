// app/projects/[id]/page.tsx
import SingleProject from "@/components/SingleProject/SingleProject";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <SingleProject id={Number(id)} />;
};

export default Page;
