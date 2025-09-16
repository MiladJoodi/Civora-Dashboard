import SingleProject from "@/components/SingleProject/SingleProject";

interface PageProps {
  params: { id: string };
}

const Page = ({ params }: PageProps) => {
  return <SingleProject id={Number(params.id)} />;
};

export default Page;
