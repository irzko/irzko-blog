import { useState, useEffect } from "react";
import Layout from "../../components/common/layout/layout";
import { useContext } from "react";
import { Context } from "../../context/context";
import axios from "axios";
import { Lock, X } from "react-feather";
import Image from "next/image";
import { Settings } from "react-feather";
import Footer from "../../components/common/footer/footer";
import Head from "next/head";

const ChangeAvatar = ({ onClick, user }) => {
  const [selectedFile, setSelectedFile] = useState({});
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
        `${process.env.NEXT_PUBLIC_HOST}/users/update-avatar`,
        {
          _id: user._id,
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
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[31.25rem] bg-white backdrop-blur-md overflow-auto rounded-3xl px-4 flex flex-col justify-between"
      >
        <div className="flex relative  justify-center py-3 items-center">
          <div className="font-medium">Cập nhật ảnh đại diện</div>
          <button
            onClick={onClick}
            className="absolute right-0 bg-[#DBD0C0] text-blue-500 flex justify-center items-center w-8 h-8 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <div className="py-3">
          <div className="flex flex-col">
            <div className="flex justify-center mb-4">
              {selectedFile.uri ? (
                <Image
                  className="rounded-full"
                  src={selectedFile.uri}
                  alt="your image"
                  width="256"
                  layout="fixed"
                  objectFit="cover"
                  height="256"
                />
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="file-upload"
                className="h-10 px-2 border-2 mr-2 text-blue-500 mb-5 p-0 rounded-xl border-blue-500 flex justify-center items-center"
              >
                <i className="bi bi-plus-lg"></i>
                <span className="ml-1">Tải ảnh lên</span>
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
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded-full"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

const EditName = ({ info, handleEditName }) => {
  const [fname, setFname] = useState(info.firstName);
  const [lname, setLname] = useState(info.lastName);

  const handleSubmit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/users/update-name`, {
        _id: info._id,
        firstName: fname,
        lastName: lname,
      })
      .then(() => {
        handleEditName();
      });
  };
  return (
    <div className="col-span-7">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 pr-2">
          <input
            className="focus:outline-none h-10 w-full bg-whitesmoke px-2 rounded-md mb-3"
            type="text"
            value={fname}
            onChange={(e) => {
              setFname(e.target.value);
            }}
            placeholder="Tên"
          ></input>
        </div>
        <div className="lg:w-1/2 pl-2">
          <input
            className="col-span-3 focus:outline-none h-10 w-full bg-whitesmoke px-2 rounded-md"
            type="text"
            placeholder="Họ"
            onChange={(e) => {
              setLname(e.target.value);
            }}
            value={lname}
          ></input>
        </div>
      </div>
      <div className="flex mt-10">
        <button
          className="bg-[#FAEEE0] py-2 w-20 rounded-full mr-2 font-medium"
          onClick={handleEditName}
        >
          Đóng
        </button>
        <button
          className="bg-[#F9CF93] py-2 w-20 rounded-full font-medium"
          onClick={handleSubmit}
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

const EditEmail = ({ info, handleEditEmail }) => {
  const [email, setEmail] = useState(info.email);

  const handleSubmit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_HOST}/users/update-email`, {
        _id: info._id,
        email: email,
      })
      .then(() => {
        handleEditEmail();
      });
  };
  return (
    <div className="col-span-7">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <input
            className="col-span-3 focus:outline-none h-10 w-full bg-whitesmoke px-2 rounded-md"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          ></input>
        </div>
      </div>
      <div className="flex mt-10">
        <button
          className="bg-[#FAEEE0] py-2 w-20 rounded-full mr-2 font-medium"
          onClick={handleEditEmail}
        >
          Đóng
        </button>
        <button
          className="bg-[#F9CF93] py-2 w-20 rounded-full font-medium"
          onClick={handleSubmit}
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

const InfoBasic = () => {
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
  }, [user._id]);
  const [toggleAvatarChanger, setToggleAvatarChanger] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };

  const handleClickChangeAvt = () => {
    setToggleAvatarChanger(!toggleAvatarChanger);
  };

  const handleEditName = () => {
    setEditName(!editName);
  };

  const handleEditEmail = () => {
    setEditEmail(!editEmail);
  };

  return (
    <div className="mx-40 pt-2 h-full mb-64">
      <h2 className="text-2xl font-medium">Cài đặt tài khoản chung</h2>
      <div className="flex flex-col items-center my-2">
        <div className="h-32 w-32">
          {usr.avatar ? (
            <Image
              loader={() =>
                `${process.env.NEXT_PUBLIC_HOST}/image/${usr.avatar}`
              }
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
        <button onClick={handleClickChangeAvt} className="text-blue-500 ">
          Thay ảnh đại diện
        </button>
      </div>
      <hr />
      <div className="py-3 grid grid-cols-12">
        <span className="font-medium col-span-3 pl-3">Tên</span>
        {!editName ? (
          <>
            <span className="font-medium col-span-7">
              {usr.firstName + " " + usr.lastName}
            </span>
            <button
              onClick={handleEditName}
              className="text-blue-500 col-span-2 flex justify-end pr-3"
            >
              Chỉnh sửa
            </button>
          </>
        ) : (
          <EditName info={usr} handleEditName={handleEditName} />
        )}
      </div>
      <hr />
      <div className="py-3 grid grid-cols-12">
        <span className="font-medium col-span-3 pl-3">Email</span>
        {!editEmail ? (
          <>
            <span className="font-medium col-span-7">{usr.email}</span>
            <button
              onClick={handleEditEmail}
              className="text-blue-500 col-span-2 flex justify-end pr-3"
            >
              Chỉnh sửa
            </button>
          </>
        ) : (
          <EditEmail info={usr} handleEditEmail={handleEditEmail} />
        )}
      </div>
      <hr />
      {toggleAvatarChanger ? (
        <ChangeAvatar user={user} onClick={handleClickChangeAvt} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default function PersonalDetails() {
  return (
    <>
      <Head>
        <title>Cài đặt</title>
      </Head>
      <div>
        <div className="fixed top-0 left-0 bg-white h-full w-80 pt-14 px-2 z-20 shadow-xl">
          <h2 className="text-2xl mt-2 font-bold">Cài đặt</h2>
          <div className="py-2 px-2 flex items-center rounded-lg font-medium hover:bg-whitesmoke">
            <Settings size={20} />
            <span className="ml-2">Chung</span>
          </div>
          <div className="py-2 px-2 flex items-center rounded-lg font-medium hover:bg-whitesmoke">
            <Lock size={20} />
            <span className="ml-2">Bảo mật</span>
          </div>
        </div>
        <div className="ml-80 py-10 mt-14 bg-white">
          <InfoBasic />
          <Footer />
        </div>
      </div>
    </>
  );
}

PersonalDetails.getLayout = function getLayout(personalDetails) {
  return <Layout footer={false}>{personalDetails}</Layout>;
};
