import Layout from "../../components/common/layout";
import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";

// import ImageResize from "quill-image-resize-module-react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

function quill_img_handler() {
  let fileInput = this.container.querySelector("input.ql-image[type=file]");

  if (fileInput == null) {
    fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute(
      "accept",
      "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"
    );
    fileInput.classList.add("ql-image");
    fileInput.addEventListener("change", () => {
      const files = fileInput.files;
      const range = this.quill.getSelection();

      if (!files || !files.length) {
        console.log("No files selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", files[0]);

      this.quill.enable(false);

      axios
        .post(`${process.env.NEXT_PUBLIC_HOST}/upload/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.quill.enable(true);
          this.quill.editor.insertEmbed(
            range.index,
            "image",
            `${process.env.NEXT_PUBLIC_HOST}/upload/${response.data}`
          );
          this.quill.setSelection(range.index + 1, "silent");
          fileInput.value = "";
        })
        .catch((error) => {
          console.log("quill image upload failed");
          console.log(error);
          this.quill.enable(true);
        });
    });
    this.container.appendChild(fileInput);
  }
  fileInput.click();
}

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [value, setValue] = useState("");
  const router = useRouter();

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        ["link", "image"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["clean"],
      ],

      handlers: { image: quill_img_handler },
    },
  };

  const formats = [
    "align",
    "background",
    "blockquote",
    "bold",
    "bullet",
    "code-block",
    "color",
    "font",
    "header",
    "image",
    "indent",
    "italic",
    "link",
    "list",
    "ordered",
    "size",
    "script",
    "sub",
    "super",
    "strike",
    "underline",
  ];

  const handleClick = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_HOST}/blogs`,
        {
          title: title,
          file: thumbnail.file,
          content: value,
          id_author: "1",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        router.push("/");
      });
  };

  const changeHandler = (e) => {
    setThumbnail({
      file: e.target.files[0],
      uri: window.URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <>
      <Head>
        <title>Tạo blog mới</title>
      </Head>
      <div className="max-w-md mx-auto pt-5 flex flex-col bg-white px-2 rounded-2xl">
        <div className="mb-5">
          <input
            className="h-10 border px-2 w-full outline-none"
            value={title}
            placeholder="Nhập tiêu đề bài viết"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
          ></input>
          <div></div>
        </div>
        <ReactQuill
          className="bg-white"
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Nhập nội dung..."
          modules={modules}
          formats={formats}
        />
        <div className="flex flex-col items-center mt-5">
          {thumbnail ? (
            <Image
              src={thumbnail.uri}
              alt="your image"
              width={(256 * 16) / 9}
              layout="fixed"
              objectFit="cover"
              height="256"
            />
          ) : (
            <></>
          )}
          <div className="flex flex-col mt-5 w-full">
            <label
              htmlFor="file-upload"
              className="h-14 border-2 text-blue-500 rounded-xl border-blue-500 flex justify-center items-center"
            >
              <i className="bi bi-plus-lg"></i>Thêm thumbnails
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              name="file"
              onChange={changeHandler}
            ></input>
          </div>
        </div>
        <div className="flex justify-end mb-5">
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white p-2 w-32 mt-3 rounded-full"
          >
            Đăng
          </button>
        </div>
      </div>
    </>
  );
}

NewPost.getLayout = function getLayout(newpost) {
  return <Layout>{newpost}</Layout>;
};
