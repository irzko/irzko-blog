import { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { Context } from "../../../context/context";
import { useContext } from "react";
import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_HOST}`);

const LikeButton = ({ post, update, likeCount, setLikeCount }) => {
  const [like, setLike] = useState(false);
  const { user } = useContext(Context);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (user && user._id) {
      post.like.includes(user._id) ? setLike(true) : setLike(false);
    }
  }, [post.like, user]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });
  }, []);

  const handleLike = () => {
    if (!post.like.includes(user._id)) {
      setLike(true);
      post.like.push(user._id);
      setLikeCount(likeCount + 1);
      socket.emit("like", { profile_id: user._id, post_id: post._id });
      // axios.post(`${process.env.NEXT_PUBLIC_HOST}/newsfeed/like`, {
      //   _id: post._id,
      //   profile_id: user._id,
      // });
    } else {
      setLike(false);
      setLikeCount(likeCount - 1);
      post.like = post.like.filter(function (value, index, arr) {
        return value !== user._id;
      });

      axios.post(`${process.env.NEXT_PUBLIC_HOST}/newsfeed/unlike`, {
        _id: post._id,
        profile_id: user._id,
      });
    }
  };

  return (
    <button
      onClick={handleLike}
      className={clsx(
        "col-span-1 flex justify-center items-center",
        like ? "text-red-500" : "text-black"
      )}
    >
      <i
        className={clsx(
          like ? "bi bi-suit-heart-fill" : "bi bi-suit-heart",
          "mr-2 text-2xl"
        )}
      ></i>
      <span className="font-medium">Thích</span>
    </button>
  );
};

export default LikeButton;
