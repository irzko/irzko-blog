import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

export default function Intro({ user }) {
  const [editProfileBtn, setEditProfileBtn] = useState(false);
  const [usr, setUsr] = useState({});
  useEffect(() => {
    if (user._id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/users/profile/${user._id}`)
        .then((result) => {
          setUsr(result.data);
        });
    }
  }, [user._id]);
  return (
    <div
      className="relative flex flex-col bg-ghostwhite rounded-2xl mt-14 h-80 justify-center items-center"
      onMouseOver={() => {
        setEditProfileBtn(true);
      }}
      onMouseLeave={() => {
        setEditProfileBtn(false);
      }}
    >
      <div className="h-32 w-32">
        {usr.avatar ? (
          <Image
            loader={() => `${process.env.NEXT_PUBLIC_HOST}/image/${usr.avatar}`}
            src={`${process.env.NEXT_PUBLIC_HOST}/image/${usr.avatar}`}
            className="rounded-full"
            width="128"
            height="128"
            layout="fixed"
            objectFit="cover"
            priority="true"
            unoptimized="false"
            quality="5"
            alt={"avatar"}
          ></Image>
        ) : (
          <></>
        )}
      </div>
      <div className="text-2xl mt-5 font-semibold">{`${usr.firstName} ${usr.lastName}`}</div>
      <div className="mt-5 bg-white/50 backdrop-blur-lg p-2 rounded-full">
        <span className="mr-5">Bài đăng: 0</span>
        <span className="mr-5">Lượt thích: 0</span>
        <span>Lượt theo dõi: 0</span>
      </div>
      {editProfileBtn ? (
        <Link href="/account/personal-details">
          <span className="absolute cursor-pointer right-5 top-5 border border-black rounded-full px-2 py-1">
            Chỉnh sửa trang cá nhân
          </span>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
