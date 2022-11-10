import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Image from "next/image";
import axios from "axios";
import {
  Home,
  Radio,
  User,
  Search,
  LogOut,
  LogIn,
  UserPlus,
  Settings,
  Shield,
} from "react-feather";

import { Context } from "../../../context/context";

const NavLink = ({ href, label, icon }) => {
  const router = useRouter();
  const [activeLinkStyle, setActiveLinkStyle] = useState();
  useEffect(() => {
    if (router.pathname === href) {
      setActiveLinkStyle(true);
    } else {
      setActiveLinkStyle(false);
    }
  }, [href, router.pathname]);
  return (
    <li className="flex">
      <Link href={href}>
        <span
          className={clsx(
            activeLinkStyle
              ? "md:bg-platinum/50 bg-whitesmoke"
              : "md:text-neutral-500 md:hover:text-neutral-900 md:hover:bg-platinum/25 hover:bg-platinum",
            "flex cursor-pointer justify-center h-10 items-center rounded-full mx-2 md:mx-1 link:rounded-full px-3 w-full md:w-auto"
          )}
        >
          <div
            className={
              icon
                ? "rounded-full border-neutral-500 h-8 w-8 flex justify-center items-center"
                : ""
            }
          >
            {icon}
          </div>
          <span className="font-medium">{activeLinkStyle ? label : ""}</span>
        </span>
      </Link>
    </li>
  );
};

const MenuDropdown = ({ user, dispatch }) => {
  const router = useRouter();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.push(`/login`);
  };
  return (
    <div className="absolute bg-white border p-3 top-14 right-0 rounded-xl flex flex-col items-start w-64 shadow-sm">
      <div
        className={clsx(
          user._id ? "block" : "hidden",
          "flex flex-col cursor-pointer"
        )}
      >
        <Link href="/profile">
          <span className="flex items-center mb-3">
            <span className="bg-whitesmoke mr-2 w-8 h-8 flex justify-center items-center rounded-full">
              <User size={20} />
            </span>
            <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
          </span>
        </Link>
        <Link href="/account/personal-details">
          <div className="flex items-center mb-3">
            <span className="bg-whitesmoke mr-2 w-8 h-8 flex justify-center items-center rounded-full">
              <Settings size={20} />
            </span>
            <span className="font-medium">Cài đặt tài khoản</span>
          </div>
        </Link>
        {user.permissionLevel === 2 ? (
          <Link href="/admin">
            <div className="flex items-center mb-3">
              <span className="bg-whitesmoke mr-2 w-8 h-8 flex justify-center items-center rounded-full">
                <Shield size={20} />
              </span>
              <span className="font-medium">Cài đặt quản trị viên</span>
            </div>
          </Link>
        ) : (
          <></>
        )}
        <div className="flex items-center" onClick={handleLogout}>
          <span className="bg-whitesmoke mr-2 w-8 h-8 flex justify-center items-center rounded-full">
            <LogOut size={20} />
          </span>
          <span className="font-medium">Đăng xuất</span>
        </div>
      </div>
      <div
        className={clsx(
          user._id ? "hidden" : "block",
          "flex flex-col cursor-pointer"
        )}
      >
        <Link href="/login">
          <span className="flex items-center mb-3">
            <span className="bg-whitesmoke mr-2 w-8 h-8 flex justify-center items-center rounded-full">
              <LogIn size={20} />
            </span>
            <span className="font-medium">Đăng nhập</span>
          </span>
        </Link>
        <Link href="/signup">
          <span className="flex items-center">
            <span className="bg-whitesmoke mr-2 w-8 h-8 flex justify-center items-center rounded-full">
              <UserPlus size={20} />
            </span>
            <span className="font-medium">Đăng kí</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

const DropDown = ({ icon, className }) => {
  const { user, dispatch } = useContext(Context);
  const [usr, setUsr] = useState({});
  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_HOST}/users/profile/${user._id}`)
        .then((result) => {
          setUsr(result.data);
        });
    }
  }, [user]);
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div
      className={clsx(
        "hidden relative md:flex justify-center h-10 w-10",
        className
      )}
      onClick={handleClick}
    >
      <button className="flex items-center rounded-full">
        {usr.avatar ? (
          <Image
            loader={() => `${process.env.NEXT_PUBLIC_HOST}/image/${usr.avatar}`}
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
          <div className="rounded-full bg-black/10 h-10 w-10 flex justify-center items-center">
            {icon}
          </div>
        )}
      </button>

      {toggle ? <MenuDropdown user={usr} dispatch={dispatch} /> : <></>}
    </div>
  );
};

const NavItem = ({ className }) => {
  const { user } = useContext(Context);
  return (
    <ul className={className}>
      <NavLink href="/" label="Home" icon={<Home size={20} />} />
      {/* <NavLink href="/news" label="Tin tức" /> */}
      <NavLink
        href={user ? "/community" : "/login"}
        label="Cộng đồng"
        icon={<Radio className="animate-pulse" size={20} />}
      />
      <DropDown className="ml-1" icon={<User size={20} />} />
    </ul>
  );
};

const OffCanvas = ({ nav, onClick }) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          "h-full right-0 fixed z-20 top-0 bg-titan-white rounded-l-2xl overflow-x-hidden pt-14",
          nav ? "w-80" : "w-0"
        )}
      >
        <a className="absolute top-3 right-3 text-3xl ml-12" onClick={onClick}>
          <i className="bi bi-x-lg"></i>
        </a>
        <NavItem />
      </div>
    </div>
  );
};

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  const handleFocus = () => {
    setSearch(!search);
  };

  const handleBlur = () => {
    setSearch(!search);
  };
  return (
    <>
      <nav className="fixed bg-white inset-x-0 px-3 h-14 top-0 z-50 flex shadow-sm">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold pr-3">irzko</a>
            </Link>
            <div className="py-2 flex items-center">
              <span className="absolute pl-2">
                <Search size={20} />
              </span>
              <input
                className={clsx(
                  search ? "pl-8" : "pl-8",
                  "h-10 max-w-96 rounded-50 outline-none bg-whitesmoke hidden md:block"
                )}
                placeholder="Tìm kiếm"
                onFocus={handleFocus}
                onBlur={handleBlur}
              ></input>
            </div>
          </div>
          <NavItem
            className={"hidden md:flex justify-center items-center inset-x-0"}
          />
          <button className="md:hidden block">
            <i className="bi bi-list text-3xl" onClick={handleClick}></i>
          </button>
        </div>
      </nav>
      <OffCanvas nav={nav} onClick={handleClick} />
    </>
  );
}
