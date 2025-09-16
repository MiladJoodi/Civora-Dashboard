import SingleProject from "@/components/SingleProject/SingleProject";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const id = Number(params.id);

  return <SingleProject id={id} />;
};

export default Page;
