import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/common/footer/footer";
import Layout from "../../components/common/layout";
import Image from "next/image";
import { useRouter } from "next/router";

const ItemUser = ({ user }) => {
  const router = useRouter();
  const viewProfile = () => {
    router.push(`/`)
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center my-2">
          <span className="h-10 w-10 mr-3">
            {user.avatar ? (
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_HOST}/image/${user.avatar}`
                }
                src={`${process.env.NEXT_PUBLIC_HOST}/image/${user.avatar}`}
                className="rounded-full"
                width="40"
                height="40"
                layout="fixed"
                objectFit="cover"
                unoptimized="false"
                quality="5"
                alt={"avarta"}
              ></Image>
            ) : (
              <></>
            )}
          </span>
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
        <button onClick={viewProfile}>Xem trang</button>
      </div>
      <hr />
    </>
  );
};

const ItemPost = ({ post }) => {
  return (
    <>
      <div className="flex justify-between items-center my-2">
        <div className="flex items-center">
          <span className="h-20 flex items-center mr-3">
            {post.thumbnail ? (
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_HOST}/image/${post.thumbnail}`
                }
                src={`${process.env.NEXT_PUBLIC_HOST}/image/${post.thumbnail}`}
                className="rounded-md"
                width="60"
                height="60"
                layout="fixed"
                objectFit="cover"
                unoptimized="false"
                quality="5"
                alt={"avarta"}
              ></Image>
            ) : (
              <></>
            )}
          </span>
          <span className="w-44 whitespace-nowrap overflow-hidden">{`${post.title}`}</span>
          <span>...</span>
        </div>
        <div>
          <div>Lượt tiếp cận</div>
          <div>{`${post.view}`}</div>
        </div>
      </div>
      <hr />
    </>
  );
};

const ShowPosts = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_HOST}/blogs/`).then((res) => {
      setPost(res.data);
    });
  }, []);
  return (
    <div className="mx-40">
      <h2 className="font-medium text-2xl">Bài viết</h2>
      <div className="flex flex-col">
        {post.map((p, index) => (
          <ItemPost key={index} post={p} />
        ))}
      </div>
    </div>
  );
};

const ShowUser = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_HOST}/users/get-all-user`)
      .then((res) => {
        setUser(res.data);
      });
  }, []);
  return (
    <div className="mx-40">
      <h2 className="font-medium text-2xl">Danh sách người dùng</h2>
      <div className="flex flex-col">
        {user.map((usr, index) => (
          <ItemUser key={index} user={usr} />
        ))}
      </div>
    </div>
  );
};

const Admin = () => {
  const [layout, setLayout] = useState(0);

  const renderSwitch = (layout) => {
    switch (layout) {
      case 0:
        return <ShowUser />;
      case 1:
        return <ShowPosts />;
    }
  };

  return (
    <div className="h-screen">
      <div className="fixed top-0 left-0 bg-white h-full w-80 pt-14 px-2 z-20 shadow-xl">
        <h2 className="text-2xl font-bold">Cài đặt quản trị viên</h2>
        <div
          className="py-2 px-2 cursor-pointer flex items-center rounded-lg font-medium hover:bg-whitesmoke"
          onClick={() => setLayout(0)}
        >
          <span className="ml-2">Người dùng</span>
        </div>
        <div
          className="py-2 px-2 cursor-pointer flex items-center rounded-lg font-medium hover:bg-whitesmoke"
          onClick={() => setLayout(1)}
        >
          <span className="ml-2">Bài blog</span>
        </div>
      </div>
      <div className="ml-80 bg-white rounded-2xl h-full overflow-auto">
        <div className="mt-14">{renderSwitch(layout)}</div>
        <Footer />
      </div>
    </div>
  );
};

Admin.getLayout = function getLayout(admin) {
  return <Layout footer={false}>{admin}</Layout>;
};

export default Admin;
