import Link from "next/link";
import TextField from "../components/common/form/textfield";
import Head from "next/head";
import Layout from "../components/common/layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { Context } from "../context/context";
import { useContext } from "react";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { dispatch, isFetching } = useContext(Context);

  const changeInputValue = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/auth`, user);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      router.push("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <h1 className="pt-3 text-5xl font-medium text-center">irzko</h1>
      <div className="md:max-w-sm flex flex-col items-center mx-auto">
        <div className="mt-6 w-full rounded-2xl bg-white shadow-2xl">
          <div className="p-3 text-center font-bold">Đăng nhập</div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-6 w-full gap-4 border-t px-3 py-5"
          >
            <TextField
              id="email"
              type="text"
              className="col-span-full"
              label="Email hoặc tên người dùng"
              onChange={changeInputValue}
              value={user.email}
            />
            <TextField
              id="password"
              className="col-span-full"
              type="password"
              label="Mật khẩu"
              onChange={changeInputValue}
              value={user.password}
            />
            <button
              className="col-span-full bg-black text-white font-medium h-12 rounded-md"
              type="submit"
            >
              Đăng nhập
            </button>
            <div className="col-span-full flex justify-center">
              <a href="#">Quên mật khẩu?</a>
            </div>
            <Link href="/signup">
              <a className="mt-8 col-span-full border border-black h-12 rounded-md flex justify-center items-center font-medium">
                Tạo một tài khoản
              </a>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

Login.getLayout = function getLayout(login) {
  return <Layout navbar={false}>{login}</Layout>;
};
