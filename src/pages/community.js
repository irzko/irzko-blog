import Layout from "../components/common/layout/layout";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Post from "../components/community/post/post";
import CreatePostNav from "../components/community/createpost/CreatePostNav";
import Head from "next/head";

const Community = () => {
  const [newsfeed, setNewsFeed] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/newsfeed`).then((result) => {
      setNewsFeed(result.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Công đồng</title>
      </Head>
      <div className="max-w-sm mx-auto">
        <CreatePostNav />
        {newsfeed
          .slice(0)
          .reverse()
          .map((post) => (
            <Post key={post._id} post={post} />
          ))}
      </div>
    </>
  );
};

export default Community;

Community.getLayout = function getLayout(community) {
  return <Layout>{community}</Layout>;
};
