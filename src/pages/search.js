import Layout from "../components/common/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import clsx from "clsx";
import Card from "../components/home/common/card";

export default function Search() {
  const [result, setResult] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}/search/${router.query.q}`)
      .then((posts) => {
        setResult(posts.data);
      });
  }, [router.query.q]);
  // console.log(result);
  return (
    <div className="max-w-md mt-14 mx-auto">
      <h2 className="text-2xl font-semibold mb-8">{`Kết quả tìm kiếm cho "${router.query.q}"`}</h2>
      {result.length > 0 ? (
        <div>
          {result.map((post, index) => (
            <Card key={index} data={post} style={"mb-4"} />
          ))}
        </div>
      ) : (
        <div>Không có kết quả nào được tìm thấy</div>
      )}
    </div>
  );
}

Search.getLayout = function getLayout(search) {
  return <Layout>{search}</Layout>;
};
