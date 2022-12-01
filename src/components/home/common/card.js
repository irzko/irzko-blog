import clsx from "clsx";
import { useRouter } from "next/router";
import Image from "next/image";

const Card = ({ data, style }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/blogs/view/${data._id}`);
  };
  return (
    <div
      onClick={handleClick}
      className={clsx(
        style,
        "bg-whitesmoke hover:bg-linen rounded-3xl cursor-pointer flex flex-col justify-end box-border h-80"
      )}
    >
      <div className="relative h-80">
        {data && data.thumbnail ? (
          <Image
            loader={() =>
              `${process.env.NEXT_PUBLIC_HOST}/image/${data.thumbnail}`
            }
            src={`${process.env.NEXT_PUBLIC_HOST}/image/${data.thumbnail}`}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            unoptimized="false"
            priority="true"
            quality="10"
            alt={data.title}
          ></Image>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col w-full p-2 z-10">
        <span className="text-2xl font-medium">{data ? data.title : ""}</span>
        <span></span>
      </div>
    </div>
  );
};

export default Card;
