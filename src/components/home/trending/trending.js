import clsx from "clsx";
import { useEffect, useState } from "react";
import Card from "../common/card";
import axios from "axios";

export default function Trending() {
  const [trendingBlog, setTrendingBlog] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/blogs`).then((res) => {
      setTrendingBlog(res.data);
    });
  }, []);
  return (
    <div className="mt-16">
      <h1 className="text-4xl font-medium">Trending</h1>
      <div className="grid grid-cols-6 grid-flow-row gap-2 mt-5">
        <Card data={trendingBlog[0]} style={"sm:col-span-3 col-span-full"} />
        <Card data={trendingBlog[2]} style={"sm:col-span-3 col-span-full"} />
        <Card
          data={trendingBlog[2]}
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
        <Card
          data={trendingBlog[3]}
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
        <Card
          data={trendingBlog[4]}
          style={"xl:col-span-2 sm:col-span-3 col-span-full"}
        />
      </div>
    </div>
  );
}
