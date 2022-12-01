import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";

import Card from "../common/card";

export default function LatestPost() {
  const [latestPost, setLatestPost] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/blogs`).then((res) => {
      setLatestPost(res.data.slice(0).reverse());
    });
  }, []);
  return (
    <div className="mt-16">
      <h1 className="text-4xl font-medium">Bài viết mới</h1>
      <div className="grid grid-cols-6 grid-flow-row gap-2 mt-5">
        <Card
          data={latestPost[0]}
          style={"xl:col-span-4 sm:col-span-3 col-span-full"}
        />
        <Card
          data={latestPost[1]}
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
        <Card
          data={latestPost[2]}
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
        <Card
          data={latestPost[3]}
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
        <Card
          data={latestPost[4]}
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
      </div>
    </div>
  );
}
