import CreatePostForm from "./CreatePostForm";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { Context } from "../../../context/context";
import axios from "axios";
import Image from "next/image";

const CreatePostNav = () => {
  const { user } = useContext(Context);
  const [usr, setUsr] = useState({});
  useEffect(() => {
    if (user._id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/users/profile/${user._id}`)
        .then((result) => {
          setUsr(result.data);
        });
    }
  }, []);
  const [a, setA] = useState(false);
  const handleClick = () => {
    setA(!a);
  };
  return (
    <>
      {a ? <CreatePostForm onClick={handleClick} /> : <></>}
      <div className="rounded-full mt-16 bg-white border shadow-sm">
        <div className="p-2 flex items-center">
          <div>
            <div className="h-10 w-10 box-border">
              {usr.avatar ? (
                <Image
                  loader={() =>
                    `${process.env.NEXT_PUBLIC_HOST}/image/${usr.avatar}`
                  }
                  src={`${process.env.NEXT_PUBLIC_HOST}/image/${usr.avatar}`}
                  className="rounded-full"
                  width="40"
                  height="40"
                  layout="fixed"
                  objectFit="cover"
                  unoptimized="false"
                  quality="5"
                  alt={"avatar"}
                ></Image>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div
            className="bg-whitesmoke text-black/80 flex items-center rounded-full ml-3 h-10 w-full px-3"
            onClick={handleClick}
          >
            Bạn đang nghĩ gì?
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostNav;
