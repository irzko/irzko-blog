import Link from "next/link";

const Footer = () => {
  return (
    <div className="2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm mx-auto">
      <div className="flex my-6 border border-black/20 rounded-2xl p-8 items-center flex-wrap">
        <Link href="/">
          <a className="text-xl font-medium">irzko &copy; 2022</a>
        </Link>
        <a className="ml-8 font-medium" href="#">
          Chính sách bảo mật
        </a>
        <a className="ml-8 font-medium" href="#">
          Điều khoản dịch vụ
        </a>
        <a className="ml-8 font-medium" href="#">
          Phản hồi
        </a>
      </div>
    </div>
  );
};

export default Footer;
