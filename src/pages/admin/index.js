import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/common/footer/footer";
import Layout from "../../components/common/layout";
import Image from "next/image";

const ItemUser = ({ user }) => {
  return (
    <>
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
      <hr />
    </>
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
  return (
    <div className="h-screen">
      <div className="fixed top-0 left-0 bg-white h-full w-80 pt-14 px-2 z-20 shadow-xl">
        <h2 className="text-2xl font-bold">Cài đặt quản trị viên</h2>
        <div className="py-2 px-2 flex items-center rounded-lg font-medium hover:bg-white-smoke">
          <span className="ml-2">Người dùng</span>
        </div>
        <div className="py-2 px-2 flex items-center rounded-lg font-medium hover:bg-white-smoke">
          <span className="ml-2">Bài blog</span>
        </div>
      </div>
      <div className="ml-80 bg-white rounded-2xl h-full overflow-auto">
        <div className="mt-14">
          <ShowUser />
        </div>
        <Footer />
      </div>
    </div>
  );
};

Admin.getLayout = function getLayout(admin) {
  return <Layout footer={false}>{admin}</Layout>;
};

export default Admin;
