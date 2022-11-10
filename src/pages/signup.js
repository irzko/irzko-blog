import TextField from "../components/common/form/textfield";
import Dropdown from "../components/common/form/dropdown";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import Layout from "../components/common/layout";
import validator from "../components/common/form/validator";
import { useRouter } from "next/router";

const RegisterForm = ({ setReg }) => {
  const [user, setUser] = useState({});

  const [errorMsg, setErrorMsg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });

  const rules = {
    firstName: [{ type: "isRequired", errorMsg: "Hãy nhập tên" }],
    lastName: [{ type: "isRequired", errorMsg: "Hãy nhập họ" }],
    email: [
      { type: "isRequired", errorMsg: "Nhập một địa chỉ email" },
      { type: "isEmail", errorMsg: "Địa chỉ email này không hợp lệ" },
    ],
    password: [
      { type: "isRequired", errorMsg: "Nhập mật khẩu" },
      {
        type: "minLength",
        min: 8,
        errorMsg: "Sử dụng 8 ký tự trở lên cho mật khẩu của bạn",
      },
    ],
    passwordConfirm: [
      { type: "isRequired", errorMsg: "Xác nhận mật khẩu của bạn" },
      {
        type: "isConfirmed",
        strCompare: user.password,
        errorMsg: "Mật khẩu đã nhập không khớp",
      },
    ],
    day: [
      { type: "isRequired", errorMsg: "Hãy nhập ngày" },
      {
        type: "isTrueDay",
        errorMsg: "Ngày không hợp lệ",
        month: user.month,
        year: user.year,
      },
    ],
    month: [{ type: "isRequired", errorMsg: "Hãy chọn tháng" }],
    year: [{ type: "isRequired", errorMsg: "Hãy nhập năm" }],
    gender: [{ type: "isRequired", errorMsg: "Hãy chọn giới tính" }],
  };

  const checkValid = (id) => {
    let msg = validator(user[id], rules[id]);

    setErrorMsg((errorMsg) => ({ ...errorMsg, [id]: msg.msg }));
    return !msg.error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = true;

    for (let key in rules) {
      let isValid = checkValid(key);
      if (!isValid) {
        isFormValid = false;
      }
    }
    console.log(isFormValid);
    if (isFormValid) {
      axios
        .post(`${process.env.NEXT_PUBLIC_HOST}/users/register`, user)
        .then(setReg())
        .catch((err) => {
          console.error(user);
        });
    }
  };

  const changeInputValue = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Head>
        <title>Tạo một tài khoản</title>
      </Head>
      <div className="mt-6 w-full rounded-2xl shadow-2xl bg-white">
        <div className="p-3 text-center font-medium">Đăng ký tài khoản</div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-6 w-full gap-x-4 border-t px-3 py-5"
        >
          <TextField
            className="col-span-3"
            id="firstName"
            type="text"
            label="Tên"
            onChange={changeInputValue}
            value={user.firstName}
            errorMsg={errorMsg.firstName}
            checkValid={checkValid}
          />
          <TextField
            id="lastName"
            className="col-span-3"
            type="text"
            label="Họ"
            onChange={changeInputValue}
            value={user.lastName}
            errorMsg={errorMsg.lastName}
            checkValid={checkValid}
          />
          <TextField
            className="col-span-full mt-4"
            id="email"
            type="text"
            label="Địa chỉ email của bạn"
            onChange={changeInputValue}
            errorMsg={errorMsg.email}
            checkValid={checkValid}
            value={user.email}
          />
          <TextField
            className="col-span-3 mt-4"
            id="password"
            type="password"
            label="Mật khẩu"
            onChange={changeInputValue}
            errorMsg={errorMsg.password}
            checkValid={checkValid}
            value={user.password}
          />

          <TextField
            className="col-span-3 mt-4"
            id="passwordConfirm"
            type="password"
            label="Xác nhận"
            onChange={changeInputValue}
            errorMsg={errorMsg.passwordConfirm}
            checkValid={checkValid}
            value={user.passwordConfirm}
          />
          <span className="col-span-full mt-4 mb-1 text-sm">Ngày sinh</span>

          <TextField
            className="col-span-2"
            id="day"
            type="tel"
            label="Ngày"
            onChange={changeInputValue}
            errorMsg={errorMsg.day}
            checkValid={checkValid}
            value={user.day}
          />
          <Dropdown
            className="col-span-2"
            id="month"
            label="Tháng"
            options={[
              { label: "Tháng 1", value: 1 },
              { label: "Tháng 2", value: 2 },
              { label: "Tháng 3", value: 3 },
              { label: "Tháng 4", value: 4 },
              { label: "Tháng 5", value: 5 },
              { label: "Tháng 6", value: 6 },
              { label: "Tháng 7", value: 7 },
              { label: "Tháng 8", value: 8 },
              { label: "Tháng 9", value: 9 },
              { label: "Tháng 10", value: 10 },
              { label: "Tháng 11", value: 11 },
              { label: "Tháng 12", value: 12 },
            ]}
            value={user.month}
            errorMsg={errorMsg.month}
            checkValid={checkValid}
            onChange={changeInputValue}
          />
          <TextField
            className="col-span-2"
            id="year"
            type="tel"
            label="Năm"
            onChange={changeInputValue}
            errorMsg={errorMsg.year}
            checkValid={checkValid}
            value={user.year}
          />
          <Dropdown
            className="col-span-full mt-4"
            id="gender"
            label="Giới tính"
            options={[
              { label: "Nam", value: 1 },
              { label: "Nữ", value: 2 },
              { label: "Không  muốn trả lời", value: 3 },
            ]}
            onChange={changeInputValue}
            value={user.gender}
            errorMsg={errorMsg.gender}
            checkValid={checkValid}
          />
          <span className="col-span-full text-sm mt-8">
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách
            quyền riêng tư và Chính sách cookie của chúng tôi.
          </span>
          <button
            className="col-span-full text-white font-medium bg-black w-full h-12 rounded-md mt-4"
            type="submit"
          >
            Đăng ký
          </button>
          <Link href="/login">
            <a className="flex justify-center mt-4 col-span-full font-medium">
              Bạn đã có tài khoản?
            </a>
          </Link>
        </form>
      </div>
    </>
  );
};

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="mt-6 w-64 h-64 flex flex-col justify-center items-center bg-white w-full border rounded-2xl">
      <span>Bạn đã đăng ký thành công</span>
      <button className="bg-black text-white p-2 rounded-full mt-10" onClick={() => {router.push(`/login`)}}>Quay lại đăng nhập</button>
    </div>
  );
};

export default function Signup() {
  const [isRegister, setIsRegister] = useState(true);
  const toggle = () => {
    setIsRegister(!isRegister);
  };
  return (
    <>
      <Head>
        <title>Đăng ký tài khoản</title>
      </Head>
      <div className="md:max-w-sm flex flex-col items-center mx-auto">
        {isRegister ? <RegisterForm setReg={toggle} /> : 
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex justify-center items-center">
          <RegisterSuccess />
        </div>}
      </div>

        
    </>
  );
}

Signup.getLayout = function getLayout(signup) {
  return <Layout navbar={false}>{signup}</Layout>;
};
