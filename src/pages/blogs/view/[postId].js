import Layout from "../../../components/common/layout/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Edit2, Star } from "react-feather";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(import("react-quill"), {
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
export default function View({ posts }) {
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
  useEffect(() => {
    if (router.query.edit) {
      setEdit(true);
    }
  }, [router.query.edit]);

  const handleClick = () => {
    router.push({
      query: {
        postId: router.query.postId,
        edit: 1,
      },
    });
  };

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

  return (
    <>
      <button onClick={handleClick}>Chỉnh sửa</button>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="bg-white flex flex-col max-w-md mx-auto pt-10">
        <div className="flex flex-row-reverse">
          <button
            className="border flex items-center py-1 px-2 rounded-50"
            onClick={handleClick}
          >
            <Edit2 size={16} />
            <span className="ml-2">Chỉnh sửa</span>
          </button>
        </div>
        <div className="text-2xl font-medium px-4">{post.title}</div>
        <div className="px-4 text-sm">
          Cập nhật: {new Date(post.updatedAt).toUTCString()}
        </div>
        {edit ? (
          <ReactQuill
            className="bg-white"
            theme="snow"
            value={post.content}
            // onChange={setValue}
            placeholder="Nhập nội dung..."
            modules={modules}
            formats={formats}
          />
        ) : (
          <ReactQuill value={post.content} readOnly="false" theme="bubble" />
        )}
        <div className="flex items-center self-end">
          <span className="mr-2">Đánh giá bài viết</span>
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
          <Star size={16} />
        </div>
        <div className="border-t mt-5">
          <h3 className="text-xl font-medium">Bình luận</h3>
          <textarea
            className="w-full focus:outline-none mt-2 resize-none p-2 bg-whitesmoke rounded-2xl placeholder:text-black/80"
            name="caption"
            rows="5"
            cols="10"
            wrap="soft"
            // onChange={handleChange}
            placeholder="Hãy bình luận bài viết này"
          ></textarea>
        </div>
      </div>
    </>
  );
}

View.getLayout = function getLayout(view) {
  return <Layout>{view}</Layout>;
};
