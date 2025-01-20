"use client";
import React from "react";
import { Button } from "../ui/button";
import NextLink from "next/link";
import { Avatar } from "../ui/avatar";
import { useSession } from "next-auth/react";

export default function UserItem() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <Button
          rounded="lg"
          variant="ghost"
          w="full"
          justifyContent="start"
          padding="0.5rem"
          h="auto"
          asChild
        >
          <NextLink href={`/profile/${session?.user?.username}`}>
            <Avatar name={session?.user?.name || session.user?.username} />{" "}
            {session?.user?.name || session.user?.username}
          </NextLink>
        </Button>
      ) : (
        <Button rounded="lg" size="sm" asChild>
          <NextLink href="/auth/sign-in">Sign in</NextLink>
        </Button>
      )}
    </>
  );
}
