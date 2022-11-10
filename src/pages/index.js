import Layout from "../components/common/layout";
import Carousel from "../components/home/carousel/carousel";
import Trending from "../components/home/trending/trending";
import SideNavBar from "../components/home/sidenavbar/sidenavbar";
import LatestPost from "../components/home/latestpost";
import Head from "next/head";
import { Context } from "../context/context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const { user } = useContext(Context);
  const [usr, setUsr] = useState({});
  console.log("SD");
  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/users/profile/${user._id}`)
        .then((result) => {
          setUsr(result.data);
        });
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <div className="md:px-0 2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm mx-auto">
        <Carousel />
        <LatestPost />
        <Trending />
        <div>{usr.permissionLevel === 2 ? <SideNavBar /> : <></>}</div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(home) {
  return <Layout>{home}</Layout>;
};
