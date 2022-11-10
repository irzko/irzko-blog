import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { Context } from "../../../context/context";
import { useContext } from "react";
import { X } from "react-feather";
import Image from "next/image";

const CreatePostForm = ({ onClick }) => {
  const { user } = useContext(Context);
  const [caption, setCaption] = useState();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState({});
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

  const handleChange = (e) => {
    setCaption(e.target.value);
  };

  const changeHandler = (e) => {
    setSelectedFile({
      file: e.target.files[0],
      uri: window.URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${process.env.NEXT_PUBLIC_HOST}/newsfeed`,
        {
          author_id: user._id,
          caption: caption,
          file: selectedFile.file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .catch((e) => {
        console.error(e);
      });
    onClick();
    router.push("/community");
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[31.25rem] h-[26.75rem] bg-white backdrop-blur-md overflow-auto rounded-3xl px-4 flex flex-col justify-between"
      >
        <div className="flex relative  justify-center py-3 items-center">
          <div className="font-medium">Tạo bài viết</div>
          <button
            className="absolute right-0 bg-whitesmoke flex justify-center items-center w-8 h-8 rounded-full"
            onClick={onClick}
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex items-center">
          <div className="h-10 w-10 mr-3">
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
          <span className="font-medium">{`${usr.firstName} ${usr.lastName}`}</span>
        </div>
        <textarea
          className="w-full focus:outline-none mt-2 resize-none p-2 bg-whitesmoke rounded-2xl placeholder:text-black/80"
          name="caption"
          rows="8"
          cols="10"
          wrap="soft"
          onChange={handleChange}
          placeholder="Bạn đang nghĩ gì thế?"
        ></textarea>
        <div className="py-3">
          <div className="flex flex-col">
            <div className="flex">
              <label
                htmlFor="file-upload"
                className="h-14 w-14 border-2 text-3xl mr-2 mb-5 p-0 rounded-xl border-black flex justify-center items-center"
              >
                <i className="bi bi-plus-lg"></i>
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                name="file"
                onChange={changeHandler}
              ></input>
              {selectedFile.uri ? (
                <Image
                  className="rounded-xl"
                  src={selectedFile.uri}
                  alt="your image"
                  width="56"
                  layout="fixed"
                  objectFit="cover"
                  height="56"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-peach-orange font-medium w-full py-2 rounded-full"
          >
            Đăng
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
