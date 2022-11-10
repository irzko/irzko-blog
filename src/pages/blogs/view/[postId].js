import Layout from "../../../components/common/layout/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";

export default function View() {
  const [post, setPost] = useState({ content: "" });
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.query.postId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/blogs/${router.query.postId}`)
        .then((result) => {
          setPost(result.data);
        });
    }
  }, [router.query.postId]);
  console.log(post.content);
  const handleClick = () => {
    setEdit(!edit);
  };

  return (
    <>
      <button onClick={handleClick}>Chỉnh sửa</button>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="bg-white max-w-md mx-auto pt-10">
        <div className="text-2xl font-medium px-4">{post.title}</div>
        <div className="px-4 text-sm">
          Cập nhật: {new Date(post.updatedAt).toUTCString()}
        </div>
        {edit ? (
          <ReactQuill value={post.content} readOnly="true" theme="snow" />
        ) : (
          <ReactQuill value={post.content} readOnly="false" theme="bubble" />
        )}
      </div>
    </>
  );
}

View.getLayout = function getLayout(view) {
  return <Layout>{view}</Layout>;
};
