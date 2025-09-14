import SingleProject from "@/components/SingleProject/SingleProject";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  return <SingleProject projectId={Number(params.id)} />;
};

export default Page;
