import Layout from "../components/common/layout";
import Intro from "../components/profile/intro/intro";
import Post from "../components/community/post/post";
import { useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../context/context";
import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/newsfeed/${user._id}`)
        .then((result) => {
          setPosts(result.data);
        });
    } else {
      router.push(`/login`);
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Trang cá nhân</title>
      </Head>
      <div className="md:px-0 2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm mx-auto">
        <Intro user={user} amountPost={posts.length} />
        <div className="max-w-sm mx-auto">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

Profile.getLayout = function getLayout(profile) {
  return <Layout>{profile}</Layout>;
};
