import { Divider } from "@heroui/react";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center mx-auto max-w-5xl mb-10">
      <h1>{title}</h1>
      <Divider className="my-4" />
    </div>
  );
}