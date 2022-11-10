import Link from "next/link";
import { Edit } from "react-feather";

export default function SideNavBar() {
  return (
    <Link href="/blogs/new-post">
      <div className="fixed cursor-pointer bottom-3 right-3 bg-peach-orange flex justify-center font-medium items-center rounded-full h-14 w-40">
        <Edit className="mr-2" size={20} />
        <span>Tạo bài viết</span>
      </div>
    </Link>
  );
}
