import SingleProject from "@/components/SingleProject/SingleProject";

interface PageParams {
  id: number;
}

const Page = async ({ params }: { params: PageParams }) => {
  return <SingleProject projectId={Number(params.id)} />;
};

export default Page;
