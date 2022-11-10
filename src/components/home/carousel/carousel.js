import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/router";

function Slides({ src, isActive = false, title, id }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/blogs/view/${id}`)}
      className={
        isActive
          ? "relative h-full w-full animate-wipe-bottom"
          : "relative hidden"
      }
    >
      <Image
        loader={() => `${process.env.NEXT_PUBLIC_HOST}/image/${src}`}
        src={`${process.env.NEXT_PUBLIC_HOST}/image/${src}`}
        alt="banner"
        layout="fill"
        unoptimized="false"
        priority="true"
        objectFit="cover"
        className="rounded-3xl"
      ></Image>
      <div className="absolute w-80 h-full flex flex-col justify-end bg-gradient-to-r from-black/25 to-transparent pb-3 pl-3 pr-32 text-xl text-white">
        {title}
      </div>
    </div>
  );
}

function Thumbnail({ src, index, click, isActive, name }) {
  const handleClick = () => {
    click(index);
  };
  return (
    <div
      className={clsx(
        "flex h-32 lg:h-1/4 w-1/4 lg:w-full relative cursor-pointer rounded-3xl p-2 overflow-hidden bg-ghostwhite"
      )}
      onClick={handleClick}
    >
      <div
        className={clsx(
          "absolute bg- z-1 w-full h-full top-0 left-0 animate-wipe-right bg-linen",
          isActive ? "block" : "hidden"
        )}
      ></div>
      <div className="h-full w-full lg:w-2/5 relative rounded-lg">
        <Image
          loader={() => `${process.env.NEXT_PUBLIC_HOST}/image/${src}`}
          src={`${process.env.NEXT_PUBLIC_HOST}/image/${src}`}
          alt="banner"
          layout="fill"
          objectFit="cover"
          unoptimized="true"
          priority="true"
          className="rounded-2xl"
          quality="10"
        ></Image>
      </div>
      <div className="h-full hidden lg:flex lg:w-3/5 ml-2 relative font-medium overflow-hidden justify-center items-center">
        {name}
      </div>
    </div>
  );
}

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/blogs`).then((response) => {
      setPosts(response.data);
    });
  }, []);

  const changeImg = (index) => {
    setCurrentIndex(index);
  };
  const slide = () => {
    if (currentIndex === posts.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  useEffect(() => {
    let timer = setTimeout(slide, 7000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex lg:flex-row flex-col gap-3 mt-28">
      <div className="h-80 lg:h-[32rem] w-full lg:w-3/4 bg-ghostwhite rounded-3xl overflow-hidden">
        {posts.map((post, index) => (
          <Slides
            key={post._id}
            id={post._id}
            src={post.thumbnail}
            isActive={currentIndex === index}
            index={index}
            title={post.title}
          />
        ))}
      </div>
      <div className="lg:w-1/4 flex lg:flex-col flex-row gap-3">
        {posts.map((post, index) => (
          <Thumbnail
            src={post.thumbnail}
            key={post._id}
            index={index}
            click={changeImg}
            isActive={currentIndex === index}
            name={post.title}
          />
        ))}
      </div>
    </div>
  );
}
