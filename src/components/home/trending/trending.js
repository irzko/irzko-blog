import clsx from "clsx";
import Card from "../common/card";

export default function Trending() {
  return (
    <div className="mt-16">
      <h1 className="text-4xl font-medium">Trending</h1>
      <div className="grid grid-cols-6 grid-flow-row gap-2 mt-5">
        <Card
          title="Hello"
          description="The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog"
          style={"sm:col-span-3 col-span-full"}
        />
        <Card
          title="Hello"
          description="The quick brown fox jumped over the lazy dog"
          style={"sm:col-span-3 col-span-full"}
        />
        <Card
          title="Hello"
          description="The quick brown fox jumped over the lazy dog"
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
        <Card
          title="Hello"
          description="The quick brown fox jumped over the lazy dog"
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
        <Card
          title="Hello"
          description="The quick brown fox jumped over the lazy dog"
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
      </div>
    </div>
  );
}
