import SingleProject from "@/components/SingleProject/SingleProject";

const Page = ({ params }: { params: { id: string } }) => {
  return <SingleProject projectId={Number(params.id)} />;
};

export default Page;
